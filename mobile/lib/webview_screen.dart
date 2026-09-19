import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'config.dart';
import 'offline_screen.dart';

/// Hosts the deployed Next.js app.
///
/// The shell is deliberately thin. All screening logic, content and scoring
/// live in the web app, so a correction to a clinical threshold ships by
/// redeploying to Vercel rather than by pushing a new build through app
/// review — which matters when the content is health information.
///
/// What the shell does add, and could not be done from the web alone:
///   - a real dialler handoff for tel: links
///   - hardware back button that walks the web history
///   - an offline screen that still shows crisis numbers
///   - navigation confined to our own host
class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  late final WebViewController _controller;
  final Connectivity _connectivity = Connectivity();
  StreamSubscription<List<ConnectivityResult>>? _connectivitySub;

  bool _loading = true;
  bool _offline = false;
  bool _loadFailed = false;

  @override
  void initState() {
    super.initState();
    _controller = _buildController();
    _watchConnectivity();
  }

  @override
  void dispose() {
    _connectivitySub?.cancel();
    super.dispose();
  }

  WebViewController _buildController() {
    final WebViewController controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFFFDFCFA))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            if (mounted) setState(() => _loading = true);
          },
          onPageFinished: (_) {
            if (mounted) {
              setState(() {
                _loading = false;
                _loadFailed = false;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            // Only a failure of the main document should take over the screen;
            // a missing image must not hide a questionnaire.
            if (error.isForMainFrame ?? false) {
              if (mounted) {
                setState(() {
                  _loading = false;
                  _loadFailed = true;
                });
              }
            }
          },
          onNavigationRequest: _handleNavigation,
        ),
      );

    controller.loadRequest(Uri.parse(AppConfig.appUrl));
    return controller;
  }

  /// Routes non-web schemes to the platform and keeps in-app navigation on
  /// our own host.
  FutureOr<NavigationDecision> _handleNavigation(NavigationRequest request) async {
    final Uri uri = Uri.parse(request.url);

    // Phone calls, WhatsApp, email and SMS go to the platform handler.
    // This is the single most important behaviour in the shell: a crisis
    // number must reach the dialler in one tap.
    const Set<String> externalSchemes = <String>{'tel', 'sms', 'mailto', 'whatsapp'};
    if (externalSchemes.contains(uri.scheme)) {
      await _launchExternal(uri);
      return NavigationDecision.prevent;
    }

    // wa.me links are https but belong in WhatsApp or the browser.
    if (uri.host == 'wa.me' || uri.host == 'api.whatsapp.com') {
      await _launchExternal(uri);
      return NavigationDecision.prevent;
    }

    // Anything on a host we do not own opens outside the app, so an external
    // site can never render inside our chrome.
    if (!AppConfig.allowedHosts.contains(uri.host)) {
      await _launchExternal(uri);
      return NavigationDecision.prevent;
    }

    return NavigationDecision.navigate;
  }

  Future<void> _launchExternal(Uri uri) async {
    try {
      final bool launched = await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!launched && mounted) {
        _showSnack('Could not open ${uri.scheme == 'tel' ? uri.path : uri.host}');
      }
    } catch (_) {
      if (mounted) _showSnack('Could not open that link');
    }
  }

  void _showSnack(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  void _watchConnectivity() {
    _connectivitySub = _connectivity.onConnectivityChanged.listen(
      (List<ConnectivityResult> results) {
        final bool nowOffline =
            results.isEmpty || results.every((ConnectivityResult r) => r == ConnectivityResult.none);
        if (!mounted) return;

        final bool wasOffline = _offline;
        setState(() => _offline = nowOffline);

        // Reload automatically when the connection comes back and the last
        // attempt had failed — the user should not have to work out why.
        if (wasOffline && !nowOffline && _loadFailed) {
          _controller.reload();
        }
      },
    );
  }

  Future<void> _retry() async {
    setState(() {
      _loading = true;
      _loadFailed = false;
    });
    await _controller.loadRequest(Uri.parse(AppConfig.appUrl));
  }

  @override
  Widget build(BuildContext context) {
    final bool showOffline = _loadFailed || (_offline && _loading);

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (bool didPop, Object? result) async {
        if (didPop) return;
        // Hardware back walks the web history first, and only leaves the app
        // once there is nowhere left to go back to.
        if (await _controller.canGoBack()) {
          await _controller.goBack();
        } else if (mounted) {
          Navigator.of(context).maybePop();
        }
      },
      child: Scaffold(
        body: SafeArea(
          child: showOffline
              ? OfflineScreen(onRetry: _retry)
              : Stack(
                  children: <Widget>[
                    WebViewWidget(controller: _controller),
                    if (_loading)
                      const ColoredBox(
                        color: Color(0xFFFDFCFA),
                        child: Center(
                          child: CircularProgressIndicator(
                            color: Color(AppConfig.brandColor),
                          ),
                        ),
                      ),
                  ],
                ),
        ),
      ),
    );
  }
}
