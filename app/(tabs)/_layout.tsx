

import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = '#BA0003'; // Active tab color
  const inactiveTintColor = '#888'; // Inactive tab color (optional)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'trt.net.tr',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ThemedText
                style={{
                  color: color || activeTintColor, // Use the color prop or fallback to activeTintColor
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                TRT
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color || activeTintColor} />
          ),
        }}
      />
    </Tabs>
  );
}
