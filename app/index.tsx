import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
 
export default function Index() {
 
  const STORAGE_NAME = 'galeria';
  const { width, height } = Dimensions.get('window');
  const numColumns = 2;
  const imageSize = (width - 60) / numColumns;
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;
 
  const [image, setImage] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const [listaFotos, setListaFotos] = useState<Array<string>>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  // Animações de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
 
  const storeImage = async(value : string) => {
    try {
      setIsLoading(true);
      const fotos = [...listaFotos, value];
      setListaFotos(fotos);
      await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(fotos));
      setImage(null);
      setFileSize(undefined);
      
      // Animação de sucesso
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      Alert.alert("🎉 Sucesso!", "Foto salva na galeria com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("❌ Erro", "Não foi possível salvar a foto");
    } finally {
      setIsLoading(false);
    }
  };
 
  const getImage = async () => {
    try{
      const value = await AsyncStorage.getItem(STORAGE_NAME);
        if (value !== null) {
          setListaFotos(JSON.parse(value));
        }
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    }
  };
 
  const removeImage = async ( indice : number) => {
    try {
      const lista = [...listaFotos];
      lista.splice(indice, 1);
      if(lista.length > 0){
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(lista));
        setListaFotos(lista);
      }
 
      if(lista.length === 0){
        await AsyncStorage.removeItem(STORAGE_NAME);
        setListaFotos([]);
      }    
    } catch (error) {
      console.error('Erro ao deletar:', error);
      Alert.alert("❌ Erro", "Não foi possível deletar a foto");
    }
  }
 
  useEffect(() => {
    getImage();
  }, []);
 
  const addFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
 
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileSize(result.assets[0].fileSize);
    }
  };
 
  const convertBytesToHuman = (size : number|undefined) => {
    if(size == undefined){
      return "";
    }
 
    const kb = size / 1024;
    const mb = kb / 1024;
   
    if(mb > 1){
      return `${mb.toFixed(2)} MB`;
    }
 
    return `${kb.toFixed(2)} KB`;
  };
 
  const renderImageCard = (foto: string, indice: number) => (
    <Animated.View 
      key={indice} 
      style={[
        styles.imageCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }
          ]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={() => setSelectedImage(foto)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: foto }} style={styles.galleryImage} />
        
        {/* Overlay com gradiente e blur */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.imageOverlay}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <View style={styles.imageInfo}>
              <View style={styles.imageNumberContainer}>
                                                  <View style={styles.numberBadge}>
                   <Text style={styles.imageNumber}>#{indice + 1}</Text>
                 </View>
              </View>
              <View style={styles.imageMeta}>
                <Ionicons name="image" size={16} color="#fff" />
                <Text style={styles.imageSize}>{convertBytesToHuman(fileSize)}</Text>
              </View>
            </View>
          </BlurView>
        </LinearGradient>
        
        {/* Efeito de brilho */}
        <View style={styles.shineEffect} />
      </TouchableOpacity>
      
      {/* Botão de deletar com animação */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => removeImage(indice)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#ff4757', '#ff3838']}
          style={styles.deleteButtonGradient}
        >
          <Ionicons name="trash" size={18} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Indicador de qualidade */}
      <View style={styles.qualityIndicator}>
        <LinearGradient
          colors={['#00d2d3', '#54a0ff']}
          style={styles.qualityBadge}
        >
          <Ionicons name="star" size={12} color="#fff" />
        </LinearGradient>
      </View>
    </Animated.View>
  );
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      {/* Header Ultra Premium */}
      <Animated.View style={[styles.header, { opacity: headerAnim }]}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <View style={styles.headerIcon}>
                  <Ionicons name="images" size={28} color="#fff" />
                </View>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Galeria Premium</Text>
                <Text style={styles.headerSubtitle}>Suas memórias em alta qualidade</Text>
              </View>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statsCard}>
                <Text style={styles.photoCount}>{listaFotos.length}</Text>
                <Text style={styles.photoLabel}>fotos</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
      
      {/* Galeria com Scroll Suave */}
      <ScrollView 
        style={styles.galleryContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.galleryContent}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
                {/* Seção de Preview Ultra Premium */}
        {image && (
          <Animated.View 
            style={[
              styles.previewSection,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <Ionicons name="sparkles" size={24} color="#fff" />
                <Text style={styles.previewTitle}>Nova Foto Selecionada</Text>
                <Ionicons name="sparkles" size={24} color="#fff" />
              </View>
              
              <View style={styles.previewImageContainer}>
                <Image source={{ uri: image }} style={styles.previewImage} />
                <View style={styles.imageBorder} />
              </View>
              
              <View style={styles.previewInfo}>
                <View style={styles.fileInfo}>
                  <Ionicons name="information-circle" size={20} color="#fff" />
                  <Text style={styles.previewSize}>{convertBytesToHuman(fileSize)}</Text>
                </View>
                
                <View style={styles.previewButtons}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setImage(null);
                      setFileSize(undefined);
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.buttonGradient}>
                      <Ionicons name="close" size={20} color="#fff" />
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={() => storeImage(image)}
                    activeOpacity={0.8}
                    disabled={isLoading}
                  >
                    <View style={styles.saveButtonGradient}>
                      {isLoading ? (
                        <View style={styles.loadingContainer}>
                          <View style={styles.loadingSpinner} />
                          <Text style={styles.buttonText}>Salvando...</Text>
                        </View>
                      ) : (
                        <>
                          <Ionicons name="checkmark-circle" size={20} color="#fff" />
                          <Text style={styles.buttonText}>Salvar</Text>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
        {listaFotos.length === 0 ? (
          <Animated.View 
            style={[
              styles.emptyState,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <LinearGradient
              colors={['#f8f9fa', '#e9ecef']}
              style={styles.emptyCard}
            >
              <View style={styles.emptyIconContainer}>
                <View style={styles.emptyIcon}>
                  <Ionicons name="images-outline" size={60} color="#fff" />
                </View>
              </View>
              <Text style={styles.emptyTitle}>Sua galeria está vazia</Text>
              <Text style={styles.emptySubtitle}>Adicione sua primeira foto para começar a criar memórias incríveis!</Text>
              <TouchableOpacity 
                style={styles.emptyAddButton}
                onPress={addFoto}
                activeOpacity={0.8}
              >
                <View style={styles.emptyButtonGradient}>
                  <Ionicons name="add" size={24} color="#fff" />
                  <Text style={styles.emptyButtonText}>Adicionar Primeira Foto</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        ) : (
          <Animated.View 
            style={[
              styles.galleryGrid,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {listaFotos.map((foto, indice) => renderImageCard(foto, indice))}
          </Animated.View>
        )}
      </ScrollView>
      
      {/* Botão Flutuante Ultra Premium */}
      <TouchableOpacity 
        style={styles.floatingAddButton}
        onPress={addFoto}
        activeOpacity={0.9}
      >
        <View style={styles.addButtonGradient}>
          <Ionicons name="add" size={32} color="#fff" />
        </View>
        
        {/* Sombra animada */}
        <View style={styles.buttonShadow} />
      </TouchableOpacity>
      
      {/* Modal de Visualização Ultra Premium */}
      {selectedImage && (
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setSelectedImage(null)}
          activeOpacity={1}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.98)']}
            style={styles.modalGradient}
          >
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedImage }} style={styles.modalImage} />
              
              {/* Controles do modal */}
              <View style={styles.modalControls}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                    style={styles.modalButtonGradient}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => {
                    // Aqui você pode adicionar funcionalidade de compartilhar
                    Alert.alert("📤 Compartilhar", "Funcionalidade em desenvolvimento!");
                  }}
                >
                                                    <View style={styles.modalButtonGradient}>
                   <Ionicons name="share-social" size={24} color="#fff" />
                 </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerGradient: {
    paddingHorizontal: 20,
    borderRadius: 0,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  headerPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 15,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: '#10b981',
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statsCard: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 80,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  photoCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  photoLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  previewSection: {
    padding: 20,
  },
  previewCard: {
    borderRadius: 24,
    padding: 25,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#10b981',
  },
  cardShine: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    transform: [{ rotate: '45deg' }],
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 15,
    textAlign: 'center',
  },
  previewImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  imageBorder: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 23,
  },
  previewInfo: {
    alignItems: 'center',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  previewSize: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  previewButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  cancelButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  saveButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    gap: 10,
    backgroundColor: '#10b981',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    gap: 10,
    backgroundColor: '#1a1a1a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingSpinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#fff',
  },
  galleryContainer: {
    flex: 1,
    flexGrow: 1,
  },
  galleryContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    flexGrow: 1,
  },
  emptyState: {
    paddingVertical: 60,
  },
  emptyCard: {
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
  },
  emptyIconContainer: {
    marginBottom: 25,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    backgroundColor: '#10b981',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyAddButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 18,
    gap: 12,
    backgroundColor: '#10b981',
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageCard: {
    width: (Dimensions.get('window').width - 60) / 2,
    marginBottom: 25,
    position: 'relative',
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: (Dimensions.get('window').width - 60) / 2,
    borderRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  blurOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  imageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageNumberContainer: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  numberBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#10b981',
  },
  imageNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  imageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  imageSize: {
    color: '#fff',
    fontSize: 11,
    opacity: 0.9,
    fontWeight: '500',
  },
  shineEffect: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    transform: [{ rotate: '45deg' }],
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  deleteButtonGradient: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  qualityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 35,
    right: 35,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  addButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#10b981',
  },
  buttonShine: {
    position: 'absolute',
    top: -25,
    right: -25,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    transform: [{ rotate: '45deg' }],
  },
  buttonShadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 35,
    zIndex: -1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    position: 'relative',
    alignItems: 'center',
  },
  modalImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 200,
    borderRadius: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  modalControls: {
    position: 'absolute',
    top: -30,
    right: -30,
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  modalButtonGradient: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
  },
});