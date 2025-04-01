import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUserType } from '@/context/UserTypeContext';

export default function UserTypeScreen() {
  const { setUserType } = useUserType();

  const handleUserTypeSelect = (type: 'freelancer' | 'hirer') => {
    setUserType(type);
    // Navigate to the appropriate layout based on user type
    if (type === 'freelancer') {
      router.replace('/(tabs)');
    } else {
      router.replace('/(hirer-tabs)');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Choose Your Role</ThemedText>
      <ThemedText style={styles.subtitle}>Select how you want to use the platform</ThemedText>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => handleUserTypeSelect('freelancer')}
        >
          <ThemedView style={styles.iconContainer}>
            <Ionicons name="briefcase-outline" size={32} color="#2ecc71" />
          </ThemedView>
          <ThemedText type="subtitle" style={styles.optionTitle}>Freelancer</ThemedText>
          <ThemedText style={styles.optionDescription}>
            Find work opportunities and showcase your skills
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => handleUserTypeSelect('hirer')}
        >
          <ThemedView style={styles.iconContainer}>
            <Ionicons name="people-outline" size={32} color="#2ecc71" />
          </ThemedView>
          <ThemedText type="subtitle" style={styles.optionTitle}>Hirer</ThemedText>
          <ThemedText style={styles.optionDescription}>
            Post projects and find talented freelancers
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  optionDescription: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
}); 