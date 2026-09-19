/// Build-time configuration for the Mental SafeZw shell.
///
/// The URL is injected at build time so the same source produces a staging or
/// production binary without editing code:
///
///   flutter build apk --release \
///     --dart-define=APP_URL=https://mental-safezw.vercel.app
class AppConfig {
  /// The deployed Next.js app. Override per build with --dart-define=APP_URL=...
  static const String appUrl = String.fromEnvironment(
    'APP_URL',
    defaultValue: 'https://mental-safezw.vercel.app',
  );

  /// Hosts the WebView is allowed to navigate to internally. Anything else
  /// opens in the external browser, so a link cannot silently take over the
  /// app's chrome and impersonate it.
  static const List<String> allowedHosts = <String>[
    'mental-safezw.vercel.app',
    'localhost',
  ];

  /// Shown on the offline screen — a crisis line must work without data.
  static const String crisisNumber = '116';
  static const String crisisLabel = 'Childline Zimbabwe — free, 24/7';

  static const String ambulanceNumber = '994';
  static const String policeNumber = '995';

  /// Brand green, matching the web app's theme colour.
  static const int brandColor = 0xFF16A34A;
}
