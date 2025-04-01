import { StyleSheet, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/Header';

interface PaymentCard {
  id: string;
  freelancerName: string;
  projectName: string;
  amount: string;
  date: string;
  avatar: string;
}

const mockPayments: PaymentCard[] = [
  {
    id: '1',
    freelancerName: 'Arjun Sharma',
    projectName: 'E-commerce Website Development',
    amount: '₹45,000',
    date: '15 Mar 2024',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    freelancerName: 'Priya Patel',
    projectName: 'UI/UX Design for Mobile App',
    amount: '₹32,500',
    date: '12 Mar 2024',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    freelancerName: 'Rahul Verma',
    projectName: 'Content Writing for Blog',
    amount: '₹15,000',
    date: '10 Mar 2024',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

export default function PaymentsScreen() {
  const handleAvatarPress = () => {
    // Handle avatar press
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
      <ThemedView style={styles.container}>
        <Header onAvatarPress={handleAvatarPress} />
        <ScrollView style={styles.scrollView}>
          {/* Available Balance */}
          <View style={styles.balanceContainer}>
            <LinearGradient
              colors={['#2ecc71', '#27ae60']}
              style={styles.balanceCard}
            >
              <View style={styles.balanceContent}>
                <ThemedText style={styles.balanceLabel}>Available Balance</ThemedText>
                <ThemedText style={styles.balanceValue}>₹2,50,000</ThemedText>
              </View>
              <View style={styles.balanceIconContainer}>
                <Ionicons name="wallet-outline" size={24} color="#fff" />
              </View>
            </LinearGradient>
          </View>

          {/* Payment List */}
          <View style={styles.paymentsList}>
            <ThemedText style={styles.sectionTitle}>Recent Payments</ThemedText>
            {mockPayments.map((payment) => (
              <TouchableOpacity key={payment.id} style={styles.paymentCard}>
                <View style={styles.paymentInfo}>
                  <Image source={{ uri: payment.avatar }} style={styles.avatar} />
                  <View style={styles.paymentDetails}>
                    <ThemedText style={styles.freelancerName}>{payment.freelancerName}</ThemedText>
                    <ThemedText style={styles.projectName}>{payment.projectName}</ThemedText>
                  </View>
                </View>
                <View style={styles.paymentMeta}>
                  <ThemedText style={styles.amount}>{payment.amount}</ThemedText>
                  <ThemedText style={styles.date}>{payment.date}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  balanceContainer: {
    padding: 16,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceContent: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  balanceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentsList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  freelancerName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 12,
    opacity: 0.7,
  },
  paymentMeta: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2ecc71',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
  },
}); 