import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export function HeaderAvatar() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/profile')}
    >
      <Image
        source={require('@/assets/images/avatar.png')}
        style={styles.avatar}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 