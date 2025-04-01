import { StyleSheet, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you would typically handle authentication
    router.push('/user-type');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/avatar.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
        <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <ThemedText style={styles.signupText}>Don't have an account? </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2ecc71',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    opacity: 0.7,
  },
  signupLink: {
    color: '#2ecc71',
    fontSize: 14,
    fontWeight: '600',
  },
}); 