import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [renda, setRenda] = useState('');
  const rendaFloat = parseFloat(renda) || 0;

  const necessidades = (rendaFloat * 0.5).toFixed(2);
  const desejos = (rendaFloat * 0.3).toFixed(2);
  const poupanca = (rendaFloat * 0.2).toFixed(2);

  const salvarSimulacao = async () => {
    if (rendaFloat <= 0) {
      alert('Digite uma renda válida');
      return;
    }

    const novaSimulacao = {
      renda: rendaFloat.toFixed(2),
      necessidades,
      desejos,
      poupanca,
    };

    try {
      const data = await AsyncStorage.getItem('historico');
      const historico = data ? JSON.parse(data) : [];
      historico.push(novaSimulacao);
      await AsyncStorage.setItem('historico', JSON.stringify(historico));
      alert('Simulação salva no histórico!');
    } catch (error) {
      console.log('Erro ao salvar', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Simulador Financeiro</Text>

        <Text style={styles.description}>
          Descubra como distribuir sua renda usando a estratégia 50/30/20.
        </Text>

        <Text style={styles.label}>Informe sua renda mensal:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3500"
          keyboardType="numeric"
          value={renda}
          onChangeText={setRenda}
        />

        {renda !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Resultado da Simulação:</Text>
            <Text style={styles.resultText}>🔧 Necessidades (50%): R$ {necessidades}</Text>
            <Text style={styles.resultText}>🎯 Desejos (30%): R$ {desejos}</Text>
            <Text style={styles.resultText}>💰 Poupança/Investimento (20%): R$ {poupanca}</Text>
          </View>
        )}

        <Button title="Salvar no Histórico" onPress={salvarSimulacao} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
});
