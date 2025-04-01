import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface TopicCard {
  id: string;
  title: string;
  description: string;
  image: any;
  price: string;
  rating: number;
  isPro?: boolean;
  onlineStatus: {
    isOnline: boolean;
    lastActive: string;
  };
  completedGigs: number;
}

const mockTopics = {
  graphicDesign: {
    title: 'Graphic Design',
    icon: 'brush-outline',
    color: '#e74c3c',
    cards: [
      {
        id: '1',
        title: 'Logo Design',
        description: 'Professional logo design for your brand',
        image: { uri: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop' },
        price: '₹2,500',
        rating: 4.8,
        isPro: true,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 156,
      },
      {
        id: '2',
        title: 'Social Media Kit',
        description: 'Complete social media design package',
        image: { uri: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&h=300&fit=crop' },
        price: '₹5,000',
        rating: 4.9,
        isPro: true,
        onlineStatus: {
          isOnline: false,
          lastActive: '2h ago',
        },
        completedGigs: 20,
      },
      {
        id: '3',
        title: 'Brand Identity',
        description: 'Full brand identity design system',
        image: { uri: 'https://www.spellbrand.com/wp-content/uploads/2016/06/brand-identity-system-featured-1.jpg' },
        price: '₹15,000',
        rating: 4.7,
        isPro: false,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 15,
      },
    ],
  },
  webDevelopment: {
    title: 'Web Development',
    icon: 'code-slash-outline',
    color: '#3498db',
    cards: [
      {
        id: '4',
        title: 'Website Design',
        description: 'Modern responsive website design',
        image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63YqlHLWwK2uCToxstsE9VnU26SoQIpALVw&s' },
        price: '₹8,000',
        rating: 4.9,
        isPro: true,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 29,
      },
      {
        id: '5',
        title: 'E-commerce Site',
        description: 'Full-featured online store',
        image: { uri: 'https://repository-images.githubusercontent.com/456963513/82528385-a73f-488f-9003-513321283a6b' },
        price: '₹25,000',
        rating: 4.8,
        isPro: true,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 50,
      },
    ],
  },
  contentWriting: {
    title: 'Content Writing',
    icon: 'pencil-outline',
    color: '#2ecc71',
    cards: [
      {
        id: '6',
        title: 'Blog Writing',
        description: 'SEO-optimized blog content',
        image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1cbtHrCxTGHJ4la-6fBeY670i0Drg92lUg&s' },
        price: '₹1,500',
        rating: 4.7,
        isPro: false,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 0,
      },
      {
        id: '7',
        title: 'Copywriting',
        description: 'Persuasive marketing copy',
        image: { uri: 'https://cxl.com/wp-content/uploads/2013/03/website-copywriting-943x720.jpg' },
        price: '₹3,000',
        rating: 4.8,
        isPro: true,
        onlineStatus: {
          isOnline: true,
          lastActive: 'Online Now',
        },
        completedGigs: 10,
      },
    ],
  },
};

const { width } = Dimensions.get('window');

export default function HirerHomeScreen() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const renderTopicSection = (topic: typeof mockTopics.graphicDesign) => (
    <View style={styles.topicSection}>
      <View style={styles.topicHeader}>
        <View style={[styles.topicIconContainer, { backgroundColor: topic.color + '20' }]}>
          <Ionicons name={topic.icon as any} size={24} color={topic.color} />
        </View>
        <ThemedText style={styles.topicTitle}>{topic.title}</ThemedText>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {topic.cards.map((card) => {
          const isExpanded = expandedCards.has(card.id);
          const description = isExpanded ? card.description : card.description.slice(0, 60) + '...';
          
          return (
            <TouchableOpacity key={card.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={card.image} style={styles.cardImage} />
                {card.isPro && (
                  <View style={styles.proBadge}>
                    <Ionicons name="checkmark-circle" size={12} color="#fff" />
                    <ThemedText style={styles.proBadgeText}>PRO</ThemedText>
                  </View>
                )}
                <View style={[styles.onlineStatus, { backgroundColor: card.onlineStatus.isOnline ? '#2ecc71' : '#95a5a6' }]}>
                  <View style={[styles.onlineDot, { backgroundColor: card.onlineStatus.isOnline ? '#fff' : '#95a5a6' }]} />
                  <ThemedText style={styles.onlineText}>{card.onlineStatus.lastActive}</ThemedText>
                </View>
              </View>
              <View style={styles.cardContent}>
                <ThemedText style={styles.cardTitle}>{card.title}</ThemedText>
                <ThemedText style={styles.cardDescription}>{description}</ThemedText>
                <TouchableOpacity 
                  onPress={() => toggleCardExpansion(card.id)}
                  style={styles.readMoreButton}
                >
                  <ThemedText style={styles.readMoreText}>
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </ThemedText>
                </TouchableOpacity>
                <View style={styles.cardFooter}>
                  <View style={styles.footerLeft}>
                    <ThemedText style={styles.cardPrice}>{card.price}</ThemedText>
                    <View style={styles.completedGigs}>
                      <Ionicons name="briefcase-outline" size={12} color="#95a5a6" />
                      <ThemedText style={styles.completedGigsText}>{card.completedGigs}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#f1c40f" />
                    <ThemedText style={styles.rating}>{card.rating}</ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.appNameContainer}>
          <ThemedText style={styles.appName}>FreelanceHub</ThemedText>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image 
            source={require('@/assets/images/avatar.png')} 
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <ThemedText type="title" style={styles.welcomeTitle}>
              Welcome back, Pratap!
            </ThemedText>
            <ThemedText style={styles.welcomeSubtitle}>
              Find the perfect talent for your projects
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.notificationCount}>3</ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Ad Banner */}
        <TouchableOpacity style={styles.adBanner}>
          <LinearGradient
            colors={['#2ecc71', '#27ae60']}
            style={styles.adGradient}
          >
            <View style={styles.adContent}>
              <View style={styles.adTextContainer}>
                <ThemedText style={styles.adTitle}>
                  Post Your First Project
                </ThemedText>
                <ThemedText style={styles.adDescription}>
                  Get 20% off on your first project with verified freelancers
                </ThemedText>
                <TouchableOpacity style={styles.adButton}>
                  <ThemedText style={styles.adButtonText}>Post Now</ThemedText>
                </TouchableOpacity>
              </View>
              <Image
                source={require('@/assets/images/avatar.png')}
                style={styles.adImage}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Rest of your content */}
        {renderTopicSection(mockTopics.graphicDesign)}
        {renderTopicSection(mockTopics.webDevelopment)}
        {renderTopicSection(mockTopics.contentWriting)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topHeader: {
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
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  adBanner: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adGradient: {
    padding: 20,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adTextContainer: {
    flex: 1,
    marginRight: 20,
  },
  adTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  adDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 16,
  },
  adButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  adButtonText: {
    color: '#2ecc71',
    fontSize: 14,
    fontWeight: '600',
  },
  adImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  topicSection: {
    marginTop: 20,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  topicIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardsContainer: {
    paddingHorizontal: 15,
  },
  card: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
  },
  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  readMoreButton: {
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 12,
    color: '#2ecc71',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ecc71',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  proBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  proBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#2ecc71',
  },
  onlineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 3,
  },
  onlineText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '500',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedGigs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  completedGigsText: {
    fontSize: 12,
    color: '#95a5a6',
  },
});
