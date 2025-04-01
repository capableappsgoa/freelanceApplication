import { StyleSheet, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HirerProfileScreen() {
  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Profile Header with Gradient */}
        <LinearGradient
          colors={['#2c3e50', '#3498db']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Image
              source={require('@/assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.headerInfo}>
              <ThemedText type="title" style={styles.name}>Pratap Singh</ThemedText>
              <ThemedText style={styles.bio}>CEO, Mewar Pvt. Ltd.</ThemedText>
              <View style={styles.companyInfo}>
                <Ionicons name="business-outline" size={16} color="#fff" />
                <ThemedText style={styles.companyName}>Tech Solutions Pvt. Ltd.</ThemedText>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Active Projects</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>₹2.5L</ThemedText>
            <ThemedText style={styles.statLabel}>Total Spent</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>4.9</ThemedText>
            <ThemedText style={styles.statLabel}>Rating</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Company Profile Section */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={24} color="#2c3e50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>Company Profile</ThemedText>
          </View>
          <View style={styles.companyDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>Mumbai, Maharashtra</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>rajesh@techsolutions.com</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>+91 98765 43210</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Account Settings */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={24} color="#2c3e50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>Account Settings</ThemedText>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="person-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Edit Profile</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Notifications</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="lock-closed-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Privacy</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        </ThemedView>

        {/* Company Settings */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={24} color="#2c3e50" />
            <ThemedText type="subtitle" style={styles.sectionTitle}>Company Settings</ThemedText>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="card-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Payment Methods</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="document-text-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Invoices</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name="people-outline" size={24} color="#666" />
              <ThemedText style={styles.menuText}>Team Management</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.menuItemContent}>
            <Ionicons name="log-out-outline" size={24} color="#ff4444" />
            <ThemedText style={[styles.menuText, styles.logoutText]}>Logout</ThemedText>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  headerInfo: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  companyName: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#2c3e50',
  },
  companyDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    paddingVertical: 15,
    margin: 20,
    marginTop: 0,
  },
  logoutText: {
    color: '#ff4444',
  },
});
