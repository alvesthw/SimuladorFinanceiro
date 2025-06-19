import { View, Text } from 'react-native';

export default function Detalhes() {
  const id = 1; // só para exemplo

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 15 }}>
        Detalhes da Simulação #{id}
      </Text>
      <Text>Aqui você pode mostrar todos os dados da simulação selecionada.</Text>
    </View>
  );
}
