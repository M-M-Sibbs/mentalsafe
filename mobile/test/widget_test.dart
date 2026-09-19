import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mental_safezw/config.dart';
import 'package:mental_safezw/offline_screen.dart';

void main() {
  group('AppConfig', () {
    test('app URL is https', () {
      expect(AppConfig.appUrl.startsWith('https://'), isTrue);
    });

    test('the deployed host is in the allow-list', () {
      final Uri uri = Uri.parse(AppConfig.appUrl);
      expect(AppConfig.allowedHosts, contains(uri.host));
    });

    test('crisis numbers are set', () {
      expect(AppConfig.crisisNumber, isNotEmpty);
      expect(AppConfig.ambulanceNumber, isNotEmpty);
      expect(AppConfig.policeNumber, isNotEmpty);
    });
  });

  group('OfflineScreen', () {
    testWidgets('shows crisis numbers without a connection', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: OfflineScreen(onRetry: () async {}),
          ),
        ),
      );

      // The whole point of the offline screen: these must be visible with no
      // network at all.
      expect(find.text(AppConfig.crisisNumber), findsOneWidget);
      expect(find.text(AppConfig.ambulanceNumber), findsOneWidget);
      expect(find.text(AppConfig.policeNumber), findsOneWidget);
      expect(find.text('No connection'), findsOneWidget);
      expect(find.text('Try again'), findsOneWidget);
    });

    testWidgets('retry callback fires', (WidgetTester tester) async {
      bool retried = false;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: OfflineScreen(onRetry: () async {
              retried = true;
            }),
          ),
        ),
      );

      await tester.tap(find.text('Try again'));
      await tester.pump();
      expect(retried, isTrue);
    });
  });
}
