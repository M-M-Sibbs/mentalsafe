import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'config.dart';
import 'webview_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Portrait only — every layout in the web app is designed for a phone in
  // portrait, and rotating mid-questionnaire is a distraction, not a feature.
  SystemChrome.setPreferredOrientations(<DeviceOrientation>[
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(const MentalSafeZwApp());
}

class MentalSafeZwApp extends StatelessWidget {
  const MentalSafeZwApp({super.key});

  @override
  Widget build(BuildContext context) {
    const Color brand = Color(AppConfig.brandColor);

    return MaterialApp(
      title: 'Mental SafeZw',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: brand,
          primary: brand,
        ),
        scaffoldBackgroundColor: const Color(0xFFFDFCFA),
      ),
      home: const WebViewScreen(),
    );
  }
}
