import { useContext, useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AppContext } from '../../../../context/AppContext';

const FormModal = ({
  discrepancy,
  setFormModal,
  modalLabel,
  setModalLabel,
}) => {
  const {
    setDiscrepancy,
    discrepanciesList,
    setDiscrepanciesList,
    setModalVisible,
  } = useContext(AppContext);
  const [text, setText] = useState('');

  useEffect(() => {
    if (discrepancy.corrective) {
      setDiscrepanciesList([...discrepanciesList, discrepancy]);
      setFormModal(false);
      setModalVisible(false);
      setModalLabel('Corrected on site?');
    }
  }, [discrepancy]);

  const onPress = () => {
    if (modalLabel === 'Description of the observation') {
      setDiscrepancy({
        ...discrepancy,
        observation: text,
      });
      setModalLabel('Corrective action');
      setText('');
    } else if (modalLabel === 'Corrective action') {
      setDiscrepancy({
        ...discrepancy,
        corrective: text,
      });
    }
  };

  return (
    <>
      <TextInput
        onChangeText={text => {
          setText(text);
        }}
        value={text}
        multiline={true}
        style={styles.textInput}
      />
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.modalButtonSuccess} onPress={onPress}>
          <Text style={styles.modalButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalButtonSuccess: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#76ff03',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    height: 100,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default FormModal;
