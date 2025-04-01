import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

export default function HirerTabLayout() {
  const hirerTabs = [
    {
      name: 'index',
      title: 'Home',
      icon: 'home-outline',
    },
    {
      name: 'search',
      title: 'Search',
      icon: 'search-outline',
    },
    {
      name: 'my-projects',
      title: 'My Projects',
      icon: 'folder-outline',
    },
    {
      name: 'payments',
      title: 'Payments',
      icon: 'wallet-outline',
    },
    {
      name: 'profile',
      title: 'Profile',
      icon: 'person-outline',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          
          tabBarActiveTintColor: '#2ecc71',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          },
          headerShown: false,
        }}
      >
        {hirerTabs.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={tab.icon as any} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
} 