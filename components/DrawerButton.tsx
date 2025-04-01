import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function DrawerButton() {
  return (
    <TouchableOpacity style={{ marginLeft: 0 }}>
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
} 