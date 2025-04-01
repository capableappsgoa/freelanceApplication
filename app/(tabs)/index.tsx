import { StyleSheet, ScrollView, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useState } from 'react';

interface GigCard {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  budget: string;
  duration: string;
  location: string;
  requirements: string[];
  postedDate: string;
  applicants: number;
}

const mockGigs: GigCard[] = [
  {
    id: '1',
    companyName: 'TechCorp India',
    companyLogo: 'https://randomuser.me/api/portraits/men/1.jpg',
    title: 'Mobile App Development',
    description: 'Looking for an experienced React Native developer to build a cross-platform mobile app for our e-commerce platform.',
    budget: '₹75,000 - ₹1,50,000',
    duration: '2-3 months',
    location: 'Mumbai, India',
    requirements: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
    postedDate: '2 days ago',
    applicants: 12,
  },
  {
    id: '2',
    companyName: 'Digital Solutions',
    companyLogo: 'https://randomuser.me/api/portraits/women/1.jpg',
    title: 'UI/UX Design',
    description: 'Need a creative UI/UX designer to redesign our company website and create a modern, user-friendly interface.',
    budget: '₹50,000 - ₹1,00,000',
    duration: '1-2 months',
    location: 'Bangalore, India',
    requirements: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping'],
    postedDate: '1 day ago',
    applicants: 8,
  },
  {
    id: '3',
    companyName: 'Content Hub',
    companyLogo: 'https://randomuser.me/api/portraits/men/2.jpg',
    title: 'Content Writing',
    description: 'Seeking a skilled content writer to create engaging blog posts and articles for our tech blog.',
    budget: '₹25,000 - ₹50,000',
    duration: 'Ongoing',
    location: 'Delhi, India',
    requirements: ['Content Writing', 'SEO', 'Technical Writing', 'Blogging'],
    postedDate: '3 days ago',
    applicants: 15,
  },
  {
    id: '4',
    companyName: 'Marketing Pro',
    companyLogo: 'https://randomuser.me/api/portraits/women/2.jpg',
    title: 'Digital Marketing',
    description: 'Looking for a digital marketing expert to help grow our social media presence and improve our online visibility.',
    budget: '₹40,000 - ₹80,000',
    duration: '3 months',
    location: 'Chennai, India',
    requirements: ['Social Media Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    postedDate: '1 week ago',
    applicants: 20,
  },
];

export default function HomeScreen() {
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

  const renderGigCard = (gig: GigCard) => (
    <TouchableOpacity key={gig.id} style={styles.gigCard}>
      <View style={styles.gigHeader}>
        <View style={styles.companyInfo}>
          <Image source={{ uri: gig.companyLogo }} style={styles.companyLogo} />
          <View>
            <ThemedText style={styles.companyName}>{gig.companyName}</ThemedText>
            <ThemedText style={styles.postedDate}>{gig.postedDate}</ThemedText>
          </View>
        </View>
        <View style={styles.applicantsContainer}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <ThemedText style={styles.applicantsText}>{gig.applicants} applicants</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.gigTitle}>{gig.title}</ThemedText>
      <ThemedText style={styles.gigDescription} numberOfLines={2}>
        {gig.description}
      </ThemedText>

      <View style={styles.gigDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="wallet-outline" size={16} color="#2ecc71" />
          <ThemedText style={styles.detailText}>{gig.budget}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#2ecc71" />
          <ThemedText style={styles.detailText}>{gig.duration}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#2ecc71" />
          <ThemedText style={styles.detailText}>{gig.location}</ThemedText>
        </View>
      </View>

      <View style={styles.requirementsContainer}>
        {gig.requirements.map((req, index) => (
          <View key={index} style={styles.requirementTag}>
            <ThemedText style={styles.requirementText}>{req}</ThemedText>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.applyButton}>
        <ThemedText style={styles.applyButtonText}>Apply Now</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
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
          <View style={styles.content}>
            {mockGigs.map(renderGigCard)}
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
  content: {
    padding: 16,
  },
  gigCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
  gigHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  postedDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  applicantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  applicantsText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
  gigTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  gigDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 20,
  },
  gigDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  requirementTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  requirementText: {
    fontSize: 12,
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
