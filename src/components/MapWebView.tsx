import React from 'react';
import { Platform, View } from 'react-native';
import WebView from 'react-native-webview';

interface MapWebViewProps {
  html: string;
}

export default function MapWebView({ html }: MapWebViewProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={{ flex: 1 }}>
        <iframe
          srcDoc={html}
          allow="geolocation *; geolocation"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Map View"
        />
      </View>
    );
  }

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ html }}
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
      mixedContentMode="always"
      allowUniversalAccessFromFileURLs
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
