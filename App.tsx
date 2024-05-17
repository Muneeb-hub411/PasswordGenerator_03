import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'Yup';
let passlenght = yup.object({
  passlen: yup
    .number()
    .required()
    .min(6, 'lenght minimum should be 6')
    .max(10, 'lenght should be maximum of 10'),
});

export default function App() {
  const [password, setpassword] = useState('');
  const [upercase, setupercase] = useState('');
  const [lowercase, setlowercase] = useState('');
  const [specialcharacter, setspecialcharacter] = useState('');
  let generatepass = () => {
    let loweralphabets = 'abcdefghijklmnopqrstuvwxyz';
    let upperalphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let specialcharacters = '%$#@^&*(';
    let character = '';
    if (upercase) {
      character += upperalphabets;
    }
    if (lowercase) {
      character += loweralphabets;
    }
    if (specialcharacter) {
      character += specialcharacters;
    }
    let newpass = createpass(character, 8);
    setpassword(newpass);
  };
  let createpass = (character: string, passlenght: number) => {
    let pass = '';
    for (let index = 0; index < passlenght; index++) {
      let ranchar = Math.floor(Math.random() * character.length);
      pass += character.charAt(ranchar);
    }
    return pass;
  };
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
