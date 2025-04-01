import { StyleSheet, ScrollView, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface ProfileStats {
  completedProjects: number;
  totalEarnings: string;
  rating: number;
  reviews: number;
}

const mockStats: ProfileStats = {
  completedProjects: 156,
  totalEarnings: '₹12,50,000',
  rating: 4.8,
  reviews: 89,
};

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleAvatarPress = () => {
    // Handle avatar press
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  const renderStatCard = (icon: string, label: string, value: string | number, color: string) => (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon as any} size={24} color={color} />
      </View>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
      <ThemedView style={styles.container}>
        <Header onAvatarPress={handleAvatarPress} />
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2ecc71']}
              tintColor="#2ecc71"
            />
          }
        >
          {/* Profile Header */}
          <LinearGradient
            colors={['#2ecc71', '#27ae60']}
            style={styles.profileHeader}
          >
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                style={styles.profileImage}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <ThemedText style={styles.profileName}>Samuel Fernandes</ThemedText>
            <ThemedText style={styles.profileTitle}>Senior App Developer</ThemedText>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#fff" />
              <ThemedText style={styles.ratingText}>4.8 (89 reviews)</ThemedText>
            </View>
          </LinearGradient>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            {renderStatCard('briefcase-outline', 'Completed Projects', mockStats.completedProjects, '#2ecc71')}
            {renderStatCard('wallet-outline', 'Total Earnings', mockStats.totalEarnings, '#3498db')}
            {renderStatCard('star-outline', 'Rating', mockStats.rating, '#f1c40f')}
            {renderStatCard('chatbubble-outline', 'Reviews', mockStats.reviews, '#e74c3c')}
          </View>

          {/* Profile Sections */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={20} color="#2ecc71" />
              <ThemedText style={styles.sectionTitle}>About Me</ThemedText>
            </View>
            <ThemedText style={styles.sectionContent}>
              Experienced app developer with 5+ years of expertise in React Native and iOS development. 
              Passionate about creating user-friendly and scalable mobile applications.
            </ThemedText>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="code-slash-outline" size={20} color="#2ecc71" />
              <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
            </View>
            <View style={styles.skillsContainer}>
              {['React Native', 'iOS', 'Swift', 'JavaScript', 'TypeScript', 'Node.js'].map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <ThemedText style={styles.skillText}>{skill}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="briefcase-outline" size={20} color="#2ecc71" />
              <ThemedText style={styles.sectionTitle}>Experience</ThemedText>
            </View>
            <View style={styles.experienceItem}>
              <ThemedText style={styles.experienceTitle}>Senior App Developer</ThemedText>
              <ThemedText style={styles.experienceCompany}>Get It Rendered</ThemedText>
              <ThemedText style={styles.experienceDuration}>2025 - Present</ThemedText>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil-outline" size={20} color="#2ecc71" />
              <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
              <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    padding: 24,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionContent: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 12,
    color: '#666',
  },
  experienceItem: {
    marginTop: 8,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  experienceDuration: {
    fontSize: 12,
    opacity: 0.6,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2ecc71',
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2ecc71',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e74c3c',
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
});
