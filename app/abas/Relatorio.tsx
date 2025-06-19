import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Historico() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const data = await AsyncStorage.getItem('historico');
      if (data !== null) {
        setHistorico(JSON.parse(data));
      }
    } catch (error) {
      console.log('Erro ao carregar histórico', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Simulação #{index + 1}</Text>
      <Text>💵 Renda: R$ {item.renda}</Text>
      <Text>🔧 Necessidades: R$ {item.necessidades}</Text>
      <Text>🎯 Desejos: R$ {item.desejos}</Text>
      <Text>💰 Poupança: R$ {item.poupanca}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Histórico de Simulações</Text>

        {historico.length === 0 ? (
          <Text style={styles.semDados}>Nenhuma simulação salva.</Text>
        ) : (
          <FlatList
            data={historico}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  semDados: {
    fontSize: 16,
    color: '#777',
  },
});
