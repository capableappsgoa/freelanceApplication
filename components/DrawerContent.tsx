import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function DrawerContent() {
  const router = useRouter();

  const menuItems = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'help-circle', label: 'Help & Support', route: '/help' },
    { icon: 'log-out', label: 'Logout', route: '/logout' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>Menu</ThemedText>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => router.push(item.route)}
        >
          <Ionicons name={item.icon as any} size={24} color="#666" />
          <ThemedText style={styles.menuText}>{item.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
  },
}); 