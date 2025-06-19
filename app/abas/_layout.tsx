import { Tabs } from 'expo-router';

export default function AbasLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{ title: 'Home' }} />
      <Tabs.Screen name="Relatorio" options={{ title: 'Relatório' }} />
    </Tabs>
  );
}
