import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setColor, setStaticColor} from '../redux/reducer/colorSlice';

interface UserData {
  address: object;
  company: object;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const Home = () => {
  const ColorStore = useSelector(state => state);
  const [FlatData, setFlatData] = useState<UserData[]>([]);
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setColor());
    dispatch(setStaticColor('Red'));
  }, []);
  useEffect(() => {
    FunData();
  }, [page]);
  const FunData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    });
    const Data = await response.json();
    if (Data.length > 0 && page == 0) {
      setFlatData(Data);
    } else if (page > 0) {
      setFlatData(FlatData.concat(Data));
    }
  };
  useEffect(() => {
    console.log('ColorStore', ColorStore?.color?.value);
  }, [ColorStore]);

  return (
    <View
      style={[styles.container, {backgroundColor: ColorStore?.color?.value}]}>
      <FlatList
        data={FlatData}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 250,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 44}}>
                {item.name}
                {FlatData.length}
              </Text>
            </View>
          );
        }}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
