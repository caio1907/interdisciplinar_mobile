import React, { useEffect, useState } from 'react';
import { Linking, ToastAndroid, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Button, Dialog, FAB, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '@Services/firebase';

interface BankData {
  PIX: string
  TED: {
    agency: string
    bank: string
    cc: string
  }
}

interface ContactData {
  address: string
  email: string
  others: string[]
  whatsapp_contact: string
}

const FABIcons: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showDialogBankData, setShowDialogBankData] = useState(false);
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [bankData, setBankData] = useState<BankData>();
  const [contacts, setContacts] = useState<ContactData>();
  const theme = useTheme();

  useEffect(() => {
    getDocs(collection(database, 'config')).then(collection => {
      collection.docs.forEach(doc => {
        switch (doc.id) {
          case 'contact':
            setContacts(doc.data() as ContactData)
            break;
          case 'bank_data':
            setBankData(doc.data() as BankData)
            break;
          default:
            break;
        }
      })
    })
  }, []);

  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 12) {
      return phone.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+($1) $2 $3-$4');
    }
    return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+($1) $2 $3-$4');
  }

  const openWhatsapp = (number: string) => {
    Linking.openURL(`https://wa.me/${number}`);
  }

  const openCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  }

  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  }

  const openOnMap = (address: string) => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
  }

  const copyPixData = (data: string) => {
    Clipboard.setStringAsync(data.replace(/\D/g, ''));
    ToastAndroid.show('PIX copiado', ToastAndroid.SHORT);
    setShowDialogBankData(false);
  }

  return (!contacts || !bankData) ? (<></>) : (
    <>
      <Portal>
        <Dialog visible={showDialogBankData} onDismiss={() => setShowDialogBankData(false)}>
          <Dialog.Title>Doação</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>PIX: </Text>
              <Text>{bankData.PIX}</Text>
              <View style={{marginTop: -10}}>
                <IconButton icon='content-copy' size={15} onPress={() => copyPixData(bankData.PIX)} />
              </View>
            </View>
            <Text style={{ fontWeight: 'bold' }}>Transferência: </Text>
            <Text>{`Banco: ${bankData.TED.bank}`}</Text>
            <Text>{`Agência: ${bankData.TED.agency}`}</Text>
            <Text>{`Conta C.: ${bankData.TED.cc}`}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme.colors.tertiary} onPress={() => setShowDialogBankData(false)}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={showDialogAddress}>
          <Dialog.Title>Localização</Dialog.Title>
          <Dialog.Content>
            <Text style={{ fontWeight: 'bold' }}>Endereço: </Text>
            <Text>{contacts.address}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme.colors.tertiary} onPress={() => setShowDialogAddress(false)}>Fechar</Button>
            <Button onPress={() => openOnMap(contacts.address)}>Abrir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FAB.Group
        {...{open}}
        fabStyle={{backgroundColor: '#24974e'}}
        visible
        icon={open ? 'close' : 'information-outline'}
        actions={[
          ...(contacts.others ? contacts.others.map(contact => ({ icon: 'phone', label: formatPhoneNumber(contact.toString()), onPress: () => openCall(contact) })) : []),
          ...(contacts.whatsapp_contact ? [{ icon: 'whatsapp', color: '#25d366', label: formatPhoneNumber(contacts.whatsapp_contact.toString()), onPress: () => openWhatsapp(contacts.whatsapp_contact) }] : []),
          ...(contacts.email ? [{ icon: 'email', color: '#5ab1e7', label: contacts.email, onPress: () => openEmail(contacts.email) }] : []),
          { icon: 'hand-heart', color: '#FDFD96', label: 'Doar', onPress: () => setShowDialogBankData(true) },
          { icon: 'map-marker', color: '#B6AFAC', label: 'Localização', onPress: () => setShowDialogAddress(true) },
        ]}
        onStateChange={() => setOpen(prev => !prev)}
      />
    </>
  )
}
export default FABIcons;
