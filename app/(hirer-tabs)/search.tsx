import { StyleSheet, TextInput, TouchableOpacity, Animated, FlatList, Image, Dimensions, View, ScrollView, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';

const { height, width } = Dimensions.get('window');

interface Freelancer {
  id: string;
  name: string;
  title: string;
  rating: number;
  hourlyRate: string;
  completedProjects: number;
  avatar: any;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  skills: string[];
}

// Mock data for freelancers
const mockFreelancers: Freelancer[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'UI/UX Designer',
    avatar: require('@/assets/images/avatar.png'),
    rating: 4.8,
    hourlyRate: '₹1,500',
    completedProjects: 128,
    location: {
      address: 'Mumbai, India',
      latitude: 19.0760,
      longitude: 72.8777,
    },
    skills: ['UI Design', 'UX Design', 'Figma', 'Adobe XD'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Frontend Developer',
    avatar: require('@/assets/images/avatar.png'),
    rating: 4.9,
    hourlyRate: '₹2,000',
    completedProjects: 95,
    location: {
      address: 'Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
    },
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    title: 'Backend Developer',
    avatar: require('@/assets/images/avatar.png'),
    rating: 4.7,
    hourlyRate: '₹2,500',
    completedProjects: 156,
    location: {
      address: 'Bangalore, India',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    title: 'Content Writer',
    avatar: require('@/assets/images/avatar.png'),
    rating: 4.6,
    hourlyRate: '₹800',
    completedProjects: 142,
    location: {
      address: 'Chennai, India',
      latitude: 13.0827,
      longitude: 80.2707,
    },
    skills: ['Content Writing', 'SEO', 'Blog Writing', 'Copywriting'],
  },
];

const SKILLS = ['UI/UX Design', 'Development', 'Content Writing', 'Marketing', 'SEO', 'Mobile Apps'];
const LOCATIONS = ['San Francisco', 'New York', 'Remote', 'Los Angeles', 'Chicago'];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredFreelancers = mockFreelancers.filter(freelancer => {
    const matchesSearch = searchText === '' || 
      freelancer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesSkill = !selectedSkill || 
      freelancer.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    
    const matchesLocation = !selectedLocation || 
      freelancer.location.address.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesSkill && matchesLocation;
  });

  const renderFreelancer = ({ item }: { item: Freelancer }) => (
    <TouchableOpacity style={styles.freelancerCard}>
      <Image source={item.avatar} style={styles.freelancerAvatar} />
      <ThemedView style={styles.freelancerInfo}>
        <View style={styles.freelancerHeader}>
          <View style={styles.freelancerMainInfo}>
            <ThemedText type="defaultSemiBold" style={styles.freelancerName}>
              {item.name}
            </ThemedText>
            <ThemedText style={styles.freelancerTitle}>{item.title}</ThemedText>
          </View>
          <View style={styles.freelancerStats}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
            </View>
            <ThemedText style={styles.hourlyRate}>{item.hourlyRate}/hr</ThemedText>
          </View>
        </View>

        <View style={styles.freelancerDetails}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <ThemedText style={styles.locationText}>{item.location.address}</ThemedText>
          </View>
          <View style={styles.skillsContainer}>
            {item.skills.slice(0, 2).map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <ThemedText style={styles.skillText}>{skill}</ThemedText>
              </View>
            ))}
            {item.skills.length > 2 && (
              <View style={styles.skillTag}>
                <ThemedText style={styles.skillText}>+{item.skills.length - 2} more</ThemedText>
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search freelancers..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list" size={24} color={viewMode === 'list' ? '#fff' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Ionicons name="map" size={24} color={viewMode === 'map' ? '#fff' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.skillsScroll}>
          {SKILLS.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.filterChip,
                selectedSkill === skill && styles.filterChipSelected
              ]}
              onPress={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
            >
              <LinearGradient
                colors={selectedSkill === skill ? ['#2ecc71', '#27ae60'] : ['#f8f9fa', '#f8f9fa']}
                style={styles.filterChipGradient}
              >
                <ThemedText style={[
                  styles.filterChipText,
                  selectedSkill === skill && styles.filterChipTextSelected
                ]}>
                  {skill}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationsScroll}>
          {LOCATIONS.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.filterChip,
                selectedLocation === location && styles.filterChipSelected
              ]}
              onPress={() => setSelectedLocation(selectedLocation === location ? null : location)}
            >
              <LinearGradient
                colors={selectedLocation === location ? ['#2ecc71', '#27ae60'] : ['#f8f9fa', '#f8f9fa']}
                style={styles.filterChipGradient}
              >
                <ThemedText style={[
                  styles.filterChipText,
                  selectedLocation === location && styles.filterChipTextSelected
                ]}>
                  {location}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );

  const renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.5937,  // Center of India
            longitude: 78.9629,
            latitudeDelta: 15,  // Zoom level to show most of India
            longitudeDelta: 15,
          }}
        >
          {filteredFreelancers.map((freelancer) => (
            <Marker
              key={freelancer.id}
              coordinate={{
                latitude: freelancer.location.latitude,
                longitude: freelancer.location.longitude,
              }}
              onPress={() => {
                // Handle marker press if needed
              }}
            >
              <View style={styles.markerContainer}>
                <Image
                  source={freelancer.avatar}
                  style={styles.markerAvatar}
                />
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  };

  const handleAvatarPress = () => {
    // Handle avatar press
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom']}>
      <ThemedView style={styles.container}>
        <Header onAvatarPress={handleAvatarPress} />
        {viewMode === 'list' ? (
          <FlatList
            data={filteredFreelancers}
            renderItem={renderFreelancer}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={ListHeader}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2ecc71']}
                tintColor="#2ecc71"
              />
            }
          />
        ) : (
          <View style={styles.mapContainer}>
            <ListHeader />
            {renderMap()}
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  toggleButtonActive: {
    backgroundColor: '#2ecc71',
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillsScroll: {
    marginBottom: 10,
  },
  locationsScroll: {
    marginBottom: 10,
  },
  filterChip: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  filterChipGradient: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  filterChipSelected: {
    shadowColor: '#2ecc71',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  filterChipText: {
    color: '#666',
    fontSize: 14,
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  listContent: {
    padding: 12,
  },
  freelancerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
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
  freelancerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  freelancerInfo: {
    flex: 1,
  },
  freelancerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  freelancerMainInfo: {
    flex: 1,
  },
  freelancerName: {
    fontSize: 16,
    marginBottom: 2,
  },
  freelancerTitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  freelancerStats: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: '500',
  },
  hourlyRate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2ecc71',
  },
  freelancerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    marginLeft: 2,
    fontSize: 12,
    opacity: 0.7,
  },
  skillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skillTag: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 11,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  map: {
    flex: 1,
    width: width,
  },
  mapContainer: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#2ecc71',
  },
  safeArea: {
    flex: 1,
  },
});



