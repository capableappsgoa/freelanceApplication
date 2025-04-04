import { StyleSheet, ScrollView, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useState } from 'react';

interface WorkItem {
  id: string;
  projectName: string;
  clientName: string;
  clientLogo: string;
  status: 'in_progress' | 'completed' | 'pending';
  progress: number;
  deadline: string;
  budget: string;
}

const mockWorkItems: WorkItem[] = [
  {
    id: '1',
    projectName: 'E-commerce App Development',
    clientName: 'TechCorp India',
    clientLogo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'in_progress',
    progress: 65,
    deadline: '15 days left',
    budget: '₹75,000',
  },
  {
    id: '2',
    projectName: 'UI/UX Design',
    clientName: 'Digital Solutions',
    clientLogo: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'pending',
    progress: 0,
    deadline: '30 days left',
    budget: '₹50,000',
  },
  {
    id: '3',
    projectName: 'Content Writing',
    clientName: 'Content Hub',
    clientLogo: 'https://randomuser.me/api/portraits/men/2.jpg',
    status: 'completed',
    progress: 100,
    deadline: 'Completed',
    budget: '₹25,000',
  },
];

export default function WorkScreen() {
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

  const getStatusColor = (status: WorkItem['status']) => {
    switch (status) {
      case 'in_progress':
        return '#2ecc71';
      case 'completed':
        return '#3498db';
      case 'pending':
        return '#f1c40f';
      default:
        return '#666';
    }
  };

  const renderWorkItem = (item: WorkItem) => (
    <TouchableOpacity key={item.id} style={styles.workCard}>
      <View style={styles.workHeader}>
        <View style={styles.clientInfo}>
          <Image source={{ uri: item.clientLogo }} style={styles.clientLogo} />
          <View>
            <ThemedText style={styles.projectName}>{item.projectName}</ThemedText>
            <ThemedText style={styles.clientName}>{item.clientName}</ThemedText>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <ThemedText style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.replace('_', ' ').toUpperCase()}
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <ThemedText style={styles.progressLabel}>Progress</ThemedText>
          <ThemedText style={styles.progressValue}>{item.progress}%</ThemedText>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
        </View>
      </View>

      <View style={styles.workDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <ThemedText style={styles.detailText}>{item.deadline}</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="wallet-outline" size={16} color="#666" />
          <ThemedText style={styles.detailText}>{item.budget}</ThemedText>
        </View>
      </View>
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
            {mockWorkItems.map(renderWorkItem)}
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
  workCard: {
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
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clientLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  clientName: {
    fontSize: 14,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 3,
  },
  workDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.7,
  },
});
