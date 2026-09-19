import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'config.dart';

/// Shown when the app cannot reach the web content.
///
/// The point of this screen is the crisis numbers. Someone in distress with no
/// data or no airtime for data still has a working dialler, and toll-free
/// numbers still connect. Those numbers are compiled into the binary rather
/// than fetched, so they are available when nothing else is.
class OfflineScreen extends StatelessWidget {
  const OfflineScreen({super.key, required this.onRetry});

  final Future<void> Function() onRetry;

  Future<void> _call(String number) async {
    final Uri uri = Uri(scheme: 'tel', path: number);
    await launchUrl(uri, mode: LaunchMode.externalApplication);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 32),
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: const Color(0xFFF7F4EE),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Icon(Icons.wifi_off_rounded, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 20),
          const Text(
            'No connection',
            style: TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.bold,
              color: Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'The assessments need a connection to load. The numbers below do not — '
            'they work from any phone, on any network.',
            style: TextStyle(fontSize: 15, height: 1.5, color: Color(0xFF475569)),
          ),
          const SizedBox(height: 28),

          // Crisis line first, and visually dominant.
          _CallCard(
            title: AppConfig.crisisLabel,
            number: AppConfig.crisisNumber,
            subtitle: 'Free from every network in Zimbabwe',
            background: const Color(0xFFDC2626),
            foreground: Colors.white,
            subtitleColor: const Color(0xFFFEE2E2),
            onTap: () => _call(AppConfig.crisisNumber),
          ),
          const SizedBox(height: 12),
          _CallCard(
            title: 'Ambulance',
            number: AppConfig.ambulanceNumber,
            subtitle: 'Medical emergency',
            background: const Color(0xFFFEF2F2),
            foreground: const Color(0xFF991B1B),
            subtitleColor: const Color(0xFFB91C1C),
            onTap: () => _call(AppConfig.ambulanceNumber),
          ),
          const SizedBox(height: 12),
          _CallCard(
            title: 'Police',
            number: AppConfig.policeNumber,
            subtitle: 'Immediate danger',
            background: const Color(0xFFFEF2F2),
            foreground: const Color(0xFF991B1B),
            subtitleColor: const Color(0xFFB91C1C),
            onTap: () => _call(AppConfig.policeNumber),
          ),

          const SizedBox(height: 28),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: onRetry,
              style: FilledButton.styleFrom(
                backgroundColor: const Color(AppConfig.brandColor),
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              child: const Text(
                'Try again',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'If you are in immediate danger, call rather than wait for the app to load.',
            style: TextStyle(fontSize: 13, height: 1.5, color: Color(0xFF64748B)),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _CallCard extends StatelessWidget {
  const _CallCard({
    required this.title,
    required this.number,
    required this.subtitle,
    required this.background,
    required this.foreground,
    required this.subtitleColor,
    required this.onTap,
  });

  final String title;
  final String number;
  final String subtitle;
  final Color background;
  final Color foreground;
  /// Passed explicitly rather than derived with an alpha helper, because the
  /// Color alpha APIs changed name across Flutter versions.
  final Color subtitleColor;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: background,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Row(
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      title,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: foreground,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: TextStyle(fontSize: 13, color: subtitleColor),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Text(
                number,
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: foreground,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
