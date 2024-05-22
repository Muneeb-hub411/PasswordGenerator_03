import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as yup from 'yup';
let passlenght = yup.object({
  passlen: yup
    .number()
    .required()
    .min(6, 'lenght minimum should be 6')
    .max(10, 'lenght should be maximum of 10'),
});

export default function App() {
  const [password, setpassword] = useState('');
  const [upercase, setupercase] = useState(true);
  const [lowercase, setlowercase] = useState(true);
  const [specialcharacter, setspecialcharacter] = useState(true);
  const [passlen, setLen] = useState(6);
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
    let newpass = createpass(character, passlen);
    setpassword(newpass);
    console.log(newpass);
  };
  let createpass = (character: string, passlenght: number) => {
    let pass = '';
    for (let index = 0; index < passlenght; index++) {
      let ranchar = Math.floor(Math.random() * character.length);
      pass += character.charAt(ranchar);
    }
    return pass;
  };
  let resetpass = () => {
    setpassword('');
    setlowercase(false);
    setspecialcharacter(false);
    setupercase(false);
    setLen(0);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.text} selectable={true}>
          Password: {password}
        </Text>

        <BouncyCheckbox
          style={styles.checkbox}
          isChecked={upercase}
          onPress={(isChecked: boolean) => setupercase(isChecked)}
          text="Uppercase"
        />
        <BouncyCheckbox
          style={styles.checkbox}
          isChecked={lowercase}
          onPress={(isChecked: boolean) => setlowercase(isChecked)}
          text="Lowercase"
        />
        <BouncyCheckbox
          style={styles.checkbox}
          isChecked={specialcharacter}
          onPress={(isChecked: boolean) => setspecialcharacter(isChecked)}
          text="Special Characters"
        />
        <View style={styles.lenghtContainer}>
          <Text>Enter the lenght</Text>
          <TextInput
            onChangeText={value => {
              if (value === '') {
                setLen(0); // Set to a default value (e.g., 0) when input is empty
              } else {
                const number = parseInt(value, 10); // Ensure proper base-10 parsing
                if (!isNaN(number)) {
                  setLen(number);
                }
              }
            }}
            value={passlen.toString()}
            placeholder="Enter Length"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={generatepass}>
          <Text style={styles.buttonText}>Generate Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={resetpass}>
          <Text style={styles.buttonText2}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'condensedBold',
  },

  lenghtContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  checkbox: {
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#E8290B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
  },
});
