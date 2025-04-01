import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { ThemedText } from './ThemedText';

interface HeaderProps {
  title?: string;
  onAvatarPress?: () => void;
}

export function Header({ title, onAvatarPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.appNameContainer}>
        <ThemedText style={styles.appName}>FreelanceHub</ThemedText>
        {title && <ThemedText style={styles.title}>{title}</ThemedText>}
      </View>
      <TouchableOpacity 
        style={styles.avatarContainer} 
        onPress={onAvatarPress}
      >
        <Image 
          source={require('@/assets/images/avatar.png')} 
          style={styles.avatar}
        />
        <View style={styles.onlineIndicator} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appNameContainer: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2ecc71',
  },
  title: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  avatarContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2ecc71',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#fff',
  },
}); 