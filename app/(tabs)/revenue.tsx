import { StyleSheet, ScrollView, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface PaymentItem {
  id: string;
  projectName: string;
  clientName: string;
  clientLogo: string;
  amount: string;
  status: 'completed' | 'pending';
  date: string;
}

const mockPayments: PaymentItem[] = [
  {
    id: '1',
    projectName: 'E-commerce App Development',
    clientName: 'TechCorp India',
    clientLogo: 'https://randomuser.me/api/portraits/men/1.jpg',
    amount: '₹75,000',
    status: 'completed',
    date: 'Mar 15, 2024',
  },
  {
    id: '2',
    projectName: 'UI/UX Design',
    clientName: 'Digital Solutions',
    clientLogo: 'https://randomuser.me/api/portraits/women/1.jpg',
    amount: '₹50,000',
    status: 'pending',
    date: 'Mar 20, 2024',
  },
  {
    id: '3',
    projectName: 'Content Writing',
    clientName: 'Content Hub',
    clientLogo: 'https://randomuser.me/api/portraits/men/2.jpg',
    amount: '₹25,000',
    status: 'completed',
    date: 'Mar 10, 2024',
  },
];

export default function RevenueScreen() {
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

  const renderPaymentItem = (item: PaymentItem) => (
    <TouchableOpacity key={item.id} style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.clientInfo}>
          <Image source={{ uri: item.clientLogo }} style={styles.clientLogo} />
          <View>
            <ThemedText style={styles.projectName}>{item.projectName}</ThemedText>
            <ThemedText style={styles.clientName}>{item.clientName}</ThemedText>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? '#2ecc7120' : '#f1c40f20' }]}>
          <ThemedText style={[styles.statusText, { color: item.status === 'completed' ? '#2ecc71' : '#f1c40f' }]}>
            {item.status.toUpperCase()}
          </ThemedText>
        </View>
      </View>

      <View style={styles.paymentDetails}>
        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountLabel}>Amount</ThemedText>
          <ThemedText style={styles.amountValue}>{item.amount}</ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText style={styles.dateLabel}>Date</ThemedText>
          <ThemedText style={styles.dateValue}>{item.date}</ThemedText>
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
          {/* Summary Cards */}
          <View style={styles.summaryContainer}>
            <LinearGradient
              colors={['#2ecc71', '#27ae60']}
              style={styles.summaryCard}
            >
              <ThemedText style={styles.summaryLabel}>Total Earnings</ThemedText>
              <ThemedText style={styles.summaryValue}>₹1,50,000</ThemedText>
              <ThemedText style={styles.summarySubtext}>This Month</ThemedText>
            </LinearGradient>

            <LinearGradient
              colors={['#3498db', '#2980b9']}
              style={styles.summaryCard}
            >
              <ThemedText style={styles.summaryLabel}>Pending Payments</ThemedText>
              <ThemedText style={styles.summaryValue}>₹50,000</ThemedText>
              <ThemedText style={styles.summarySubtext}>2 Projects</ThemedText>
            </LinearGradient>
          </View>

          {/* Payment List */}
          <View style={styles.content}>
            <ThemedText style={styles.sectionTitle}>Recent Payments</ThemedText>
            {mockPayments.map(renderPaymentItem)}
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
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentCard: {
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
  paymentHeader: {
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
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  amountContainer: {
    alignItems: 'flex-start',
  },
  amountLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    opacity: 0.8,
  },
}); 