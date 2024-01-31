import React, { useCallback, useState } from 'react'
import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { Alert, FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

const Groups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const  [groups, setGroups] = useState<string[]>(['Galera do trampo']);
  const navigation = useNavigation();

  const handleCreateGroup = () => {
    navigation.navigate('new');
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]))

  return (
    <Container>
      <Header />

      <Highlight 
        title="Turmas"
        subtitle="Jogue com seus amigos" 
      />
      
      {
        isLoading ? <Loading /> :
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard 
              title={item} 
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleCreateGroup}
      />
    
    </Container>
  )
}

export { Groups }
{/* <GroupCard title="Galera do trampo" /> */}
