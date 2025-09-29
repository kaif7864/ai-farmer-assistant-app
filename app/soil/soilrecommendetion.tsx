import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, router } from "expo-router";

const { width } = Dimensions.get('window');

// --- Component Data ---
interface SoilParameter {
  name: string;
  yourValue: number | string;
  optimalMin: number;
  optimalMax: number;
  unit: string;
}

interface CropRecommendation {
  id: number;
  name: string;
  matchScore: number; 
  imagePlaceholder: 'wheat' | 'maize' | 'mustard'; 
}

// Mock Recommendations (Simulated AI/ML output)
const mockRecommendations: CropRecommendation[] = [
  { id: 1, name: 'Wheat (Rabi)', matchScore: 92, imagePlaceholder: 'wheat' },
  { id: 2, name: 'Maize (Kharif)', matchScore: 78, imagePlaceholder: 'maize' },
  { id: 3, name: 'Mustard (Rabi)', matchScore: 65, imagePlaceholder: 'mustard' },
];

// Optimal Ranges for Comparison (Example Data)
const optimalRanges = {
  N: { min: 60, max: 90 },
  P: { min: 30, max: 55 },
  K: { min: 30, max: 50 },
  pH: { min: 5.5, max: 7.0 },
};
// ------------------------------------------

const CropRecommendation: FC = () => {
  // Get parameters passed during navigation
  const params = useLocalSearchParams();
  
  const [results, setResults] = useState<CropRecommendation[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { nitrogen, phosphorus, potassium, ph, temperature, rainfall } = params;
  
  // Function to parse and validate parameters
  const getValidatedParams = () => {
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature || !rainfall) {
      return null;
    }
    return { 
      N: parseFloat(String(nitrogen)), 
      P: parseFloat(String(phosphorus)), 
      K: parseFloat(String(potassium)), 
      pH: parseFloat(String(ph)), 
      Temp: parseFloat(String(temperature)), 
      Rain: parseFloat(String(rainfall)) 
    };
  }

  // Effect to simulate prediction logic when component loads
  useEffect(() => {
    const validatedParams = getValidatedParams();

    if (validatedParams) {
      // Simulate AI/ML Logic based on received parameters
      setTimeout(() => {
        setResults(mockRecommendations);
        setLoading(false);
      }, 2000); 
    } else {
      // If parameters are missing, redirect back to the form
      Alert.alert('Error', 'Missing input parameters. Redirecting to form.');
      router.replace('/soil/soildetection'); 
    }
  }, [nitrogen, phosphorus, potassium, ph, temperature, rainfall]); 

  // --- Helper for Mock Images ---
  const getCropImageSource = (placeholder: 'wheat' | 'maize' | 'mustard') => {
    switch (placeholder) {
      case 'wheat':
        return { uri: 'https://m.media-amazon.com/images/I/714xCG6CxKL._UF1000,1000_QL80_.jpg' };
      case 'maize':
        return { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj4i4qY6FmUGtEqhdPlywaBt-NQKgRLeeAUA&s' };
      case 'mustard':
        return { uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhMTExMVFRUVFxobGBcYGBodIRseIR8fGSMdHyAhIioiIRwnICAfIjEhJSorLi8uHR8zRDMsNyktLisBCgoKDg0OGxAQGy8lHyUtLS8rKy8tNS0vMi0vLzUrKy0tLTAvLS01LzUtLSstNTctLS0tLS04LS0tNS01LS0tLf/AABEIAOIA3wMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xAA4EAACAgEDAwMDAwMCBQQDAAABAgMRAAQSIQUTMSJBUQYyYRQjQgdxgVKRJDNyocFDYrHRFReC/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EACIRAQEBAAICAgMAAwAAAAAAAAABEQIhMUFR8BJhcQOBsf/aAAwDAQACEQMRAD8A7jjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjGMBjKab6q0SpvOpi2kkD1j1EXYUfy8HxmpdS/qVUII0u5nLeJNyrH/qbaN/Is8KQACbzP5RucOTe+n9ThnDGGVJArFW2kGj8HJefnPpP1VLp5Q+ml1CRvuMSykSK9eBIFUHZuf7qDURzd5vnS/wCoeo09R9QhZppaaNE7IIUnkkh9uzlQpvcbPFU2Jy+S8e+nUMZyk/UQ6j1HStG8+nihY7gWoEqdxVlVxtJ2FTu3CjVC8ldO/qUx1U7ajZDoo7UEozMWuhTKTvZiD6FU0Pgjl+SXi6ZjNQ6f/UbRTaldPH3TuIUSmMqm4+ENkMGNirWuQLvjLbr/ANUaXRlFnkIaS9qqjuxA8mlBNC/OXYn43cXOMr+ndd007vHDqIpXSiyo6sQD7kA5YZUMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYzV/rf6ijg00ypKO+QURUNtvPAFL6lskDd7XeS3Fk24zQ/VKvqpNMiWVU7X3iiwu1YDlQOPV8mqHF8l139Q+orPLp2d9xZxKqrBJ2qsARkCtleWe/bwbvVW14WRXCROWIUB/X6wWBcH7yxayfTZavajkEySq6xliroth1iYswYVtb3rcoFkfcfxmNvt2yTwstVqwChR5k1LSInYUEkC24Hc3UdzeQdtsxAHFYNTp5YppVRgG7Qd7aOz43GMgUrUvAPPxwc9dFhlm02oU6YTyOZFDPJbhgqk3xfpO4qLFkn834g1wgi/ZZNW0ySsbHqj4C3Jdg2ASBd8eObyJfkkkgaXTCGOSJSjG1q2tr55HpUe9m+ffz50s2xkhcRRSBiF1IYswYUN3Hk1RonkMPisq9QNOIYmgkkE/p32pGxSCSQR4TnirsE/3ybPMsaJB/wAPIrhf+JCE7RtZSleN9c+b5HN+Kr1AYhNtkMI7JcsbMneawQQCRbew5J+68sYtejRxRzuqxMaljQFXSipRWF3sWzRUDlRf3c1Wm0MkqNLGN2m0wZkLKAWVbssAbHnz/bg5m6l1qNljPaVI6CSoBUvoIkDX/EsTQPwPPwsTcZIGBjnZWmEv3KNshLohNAhR6V2KovgcG/tyf0zXCoTKE7QqOJULPsYBmLUATR8naDwKr519ZmDxOJW9SMP2nO5EFgA7aoc+ffnLHqbdmXtkpEsMZk05jVQ7s4CqW97JF7T4H4rA23T9d02kR5OmHVrLP+3AZ0iMaralmTy1cADfdWODRzq/0P8AUC6iIRPqEl1MagyqCu4X/qC0u4cA7fB4NHOCdYhEcaQiNIpINkzN3AXcutbUIBZrsGm9wRQ85h/VtGs+2aSBSwZUYkNIHIsFlYegtuNg0NvPxllS8en6oxmpfQ3XIf8A8dpXknUenZuldRZBqrLG68XZJ/vxm2g5tzswxjGEMYxgMYxgMYxgMYxgMidT6lFAm+Vtq3XALH/AUEn/AGyWc5r1P6x0GrR49TviljkbtIkhDtwRQIAokAgqfHFEmqzyuN8OO93wlfUX9QVMLjRkGXeoTdX7yFd5aHyCa9mr5rkXybretUyTg7ZgFJSdEaMg1yVthtbcLs39p4HOSFMG+RRAYz9yoDRSmI9LeVpbWlNMOa4sU+n1bQvNHCzKnfKATKGQErsNkeCOeDd+n3vMbbXTJJ08/T+hhkWSRZhD2juQlRuUqt2f/aTxtHJJbnxmKHqeodW1ZaOolRO21XSsNoqv9Tbq/GZR0wp+xDCDqNOyM08ZDLypY1uosxv7fbafizG/UNMr63U9mcUgZLAZRuKAAfJ9/eiDjCWsnVenNAGMOrEsmoaikbbbJ9Rbz9lWL48/7YNcsKjTJHE/6gSU6OKUqAKUnwT4P4v28ZLZRDpGAaB4p37YXbuePd+5vB8sVoLfHtkkdMhQTMV/WIYiw1G4ptcLsCgkc7SL3AUfF8Y3DJXtHnV9QwiggI01Mr+oPase7YoBmBoH5AHtleqytpYxpz3YYj3Xd4wChXcCAbtlCmzQ58Wa4rodXEYQr7mnYptlBLV6hww/C36a+MuIZF3tE2qfsTCmZYwAGYnch2gnilJC/Jw11mHStDqZpdQkc8QQks0QbbHJSh+QD9vI83yPBrMGo1aakSOhWB1gWJYttvN4Y/mzyL8+P8eIljOkRJHKduVFY9oL9xIZRJX27fXTE3t8DLL6chWbXPKuoW4pNqs9nuKOFY8bQgCjkcmxj91LPHGe2HpQV59KIYWicpIr7txEh3Fdu2/4gkEWL/8AmLJEketfTQy7gSUlZwrK5DH7R7Ctor/q9uMzRQNNqZmljSSPWSSCOYtt27XsmM0aYivI5Hm+chazSGPU6mOV2mZ1dY5UICuye5/9o20QPcVl1mzpM1fRmhmaImOWKKa2lNnyitb1ZobgN3i68cZk07M0jvA33GVA8nqjRF+wox9wCaB+L9uYLaPUzbdWqKqSssTKj7dx2s1N4FEKSb+PzlluSSI6kLJFDCY2UbVdSwqMM67h9zFhfsP+7+LP2l9K0b63UaKOZ2iBQCJpCH3KSWaix20Dfp4NAj3UZ0D6L1Gn0M07zdWjnjWo1USSsb9l7dlfSBQ2A/8A8gEHl0MjqkP855A3ZS1ZArMSygHhfNr+QPIGWn0mUV4ImjEkLsA3fbbscGmCUylGAH/MJPG4V5uS05cZ4j9KRyBgGUgggEEeCDzeesqegdd0mpUrpZVdY6X0ggAVxVgArXuLGW2dXCmMYwGMYwGMYwGMYwIHUOswQPGksgVpTtQUTz45IFKL4s0LzjX111SDUdTYMryBFMPYLAbnFlXoi9oPNAi9oI/0tsf9V9XCWYbZ1miQCOSOQhSzMG2MoNgkA09cc8ji+UM8xkd2BIRkLNJJI8isCoNXRZvYLfJY0Td5i114zEH9EQEYugfuBHYyOXBG5QSl3VKST7K/+c8aKaJpCkswjjZ7ZFG5dwKi2J5Ios1fK175IKbGZo+SjHczcNsZQWBU0z7a421wMxuYmKapnV5u4t6YJVp7FR7+kK1ng2ck7avVyPeg0UgDSiVY9PI4JC8Ku40u4E2ErhqPvWSOq9WGrkj3QQoUWY91iQrgA/ba+AaIHtxfGelj72s/Y07FEjQyxE7QX82FNAk8Vx55zENOZlj9HejdnEenR9rRCi5FnzQGy2HFf4zP9WbOoyaiRY9LHJFo2SVGT9zjbtClm3e53VuF/wB/jJmoZmkKnUK0WsWRnSDaoG2rrcDSt5oeTkfqUrGKDTlzKZSFMJtNktBFLk/F1R28qT/b6OgCTTN2oZP1MDKJJQ69vYi7nJNjgLta1Fgf5yb6azLv37j70rRdrU7JpDHJCFYSxU6cxtzJ5G/wAKFAnzxkT9Q00sMsmoggMzMxFf8ALZFEVOLsBgeSfcHJ/TdY0USzRRPDp5Solkf91QzllLDkN9o2iyfc8e9TqBJPqZiUhBnY9uY+hPRRtbHJNDk+bvnKlv3/AIsur6lNUkUz6lIpu9EnZI9NKpHdYGjde9AUVH5yPrJxqNUzmCKePSQ7ZGiJCyKm5jIT5s3VjxQA+caPTzTd3SJGj6kWjyNJuUILBo1Xkitp4+Mx9FM0unm08cAK+N1gMCDvZePO4AqT8EDKmMMLg6VWmlA/TnemmYfcGYC/knbRDHigPzk+XqWneT9VHUTokUcWn2ndMbFsa4Wz4Isen85m0kr6xpBpYgsMsSRMrsXKlFA3hfegeAPHng3kWLU9yLVvDDAFSH1LZ4KsF7yggFW5XaPbj34N8s3pG1+jbUyRxkJBJJ3ZNkn7aAE7gQ1USfUoPI49vA9aANIUi0ySGNULyxSH0llBa+fhaPPF0ffPmvjmX9qRO5+ojQRvIw9IBPCEewINcDyeD5MrVaDVzxTM7Ro+liZHC2GcBgbJB5JB4u7B/PAvnWGbqsR7kygaeSN430wQB7PpDcm1+W2gCiaN8ZY6eKSGRZ1Vn7a+lHpmktwXYbQaCk2fuJA8+Kqn1jrpNMS0BVJCnbKfduXndzyq+D45PzWZ9WP08enLSGRoSrlQWG+NyAPApKK1yxJv8C5i29N1+mOqNp9ZBHpmihhmEZ2rJ3AS1gqxeyi+njbXNCzwM7tn5hh1GpEocoZtawV4X3byq35IYgUAPSjAgnkg52r6Q+udPLpQ0+pAeNf3JJF7YPJAN0EZqq9nF+OCM1xvqs8+O9yN0xmPTzq6q6MGRgCrKQQQeQQRwRmTNuRjGMBjGMBjGVf1NruzppX3UdpC15Jo8A+x88+2S3Fk245X/VoAauVW2DuQAqypZLj0IrEJe7c3pbcOCRYHDc4TRO8kTbZIUR0EkhfcVYneGI9/tNeQLH9stfqepzPI0nKqFVw7Mp8nc3sGLegCgbQ+T4iabUA6T06ftiExCaQvTqAQrkKKYl95v3pj7Zzl12vHI9ShxqmipdWZIY7DgLsUDeV3ittE0aHIIvxkH6Ui7m+ELHHKBvSaS9yi1FBb5HJFH07SxIOfevRLKYk0okMIYLGChC7mLAgM38TtXg3ZsXwc89Q1cmpki3oRsLVLCp5Xf6nr7q9gCPc+cRrlmff9pGtmhhmiUSSJqIy6zvvYksAFrf4YEi1I8CuAc+dG6hpRJIZZHjaMFYZIo9pZObZhXqJ4NEV5NecjHTaWSSaQTglApQNtXftCllNVSV6QQCb9sk66WOR9yB9M6whUG31SF7WqANgD0155/GMTajTaicpCZf3QWM8i9o220gkNfDD7VNeBXsM2nVz9yRRKzaLuxSxyOxX98k8q1E/aCFNUxDUOBlTq9HqNRAzzzdmWBW2xtSksa49uXNAD2I8/ETqmqeURzjuj9GWaUSOnEpcfZwb9RHDDn2HnKyjdSnCRQ00kcpYXplDxqBVFqPgnxYPJs8cjLXUaIxhpVSARR6ZWMM0pc3u7bBOARZYHb44+RnjVyvIkEuvX/htvZQRG23bSwLC7Y+OfAqsg6wvFGdK5DxiSOTeAwZ1IO0qrgXRYpxyKIA85I1bdVOiOztuyxyLtIKL58XbDwSPNH3rNl6r0+VpUaKIaY6gLErB9q7lBDBgAbdrAG02KPJzCYUeCaOIR/pozvqbiUbBudUI+3cSQLG4+LrJL65jE0wgl7CxKkLSOo7LP6TID5+8Ah+Wri6x+03OvSJo3eLszd5IQrdhxAAHv1Wx83xuXcACBt/vkro86y1oe3EYEkWRXkpWeNdxX8KWHkn3NEC+MC9PmOp06rCl6eIMTD5N2wJv3B5r/AE+/OfdW21xLFGU0zzsY5pFRpTvjLbH8gq1k0QfAvkcsXfhC6swX/iJo3MU6FtGO7ZjCsQqtRBCjm6+fNk556ckW945WaZpkDqkbMPURYVr8FCLNnwB/bMvVNFF+pig07bVURq8s1lVcAkcnlVYMLHjddcZn6jK82mbV3EiMIopFCgsApoOpP87HJAsCvjKz4U/UtEyM6hX7cL/uFijW/Ckg+CN35Pt75aaqSLuxvEJDHOakXtgCRVAoqhWqDD2FA175E1sld2HTzO0RYFou2wJQU9nz5azV/n4yZqdEup0qzI6QQacpGQzMSe4wDMFugL9RX4s37YNrP9OapUiEzKlrMoieWOQkhmorvR1shASFYkUGFc3n2XWKT+lEaqP1TcgyKq0aTadxXkMasMBXiuMgaTUfqJdLGxEaxlgDRp7PDbT7ke49gB5za/orqEUOq1j6iYKT3UidY3KGTmMMiLZewWtfAq/zkztd6dc+ifqPTTKsGnWbbGoAkcCnNWaN2T73tCm+M2zNF/pZ9PTaaKRpjG5k2mN0AA2V7LsUoPHpPII/Gb1nSeHLl5MYxlZMYxgM1X+oXUdNFAq6rTy6iORvtiIBBXm7Lp/sDZ59rzas57/V7RvJHBt7Z2Mz7Wu1KgHuKv8AMqL9BIu6zPK5G+E245Z9XQ6IG9DNK0Lf+nJSoQapFcjcVBA4b/SOSRlBNpIv0qStJDujKMyre9yW5TcTe4KfjihmXU6eKSKU9x6DUjbHK0SAFAAq9xYfI8Z7nliaJEk05jEXb722lftgbRQPLKXIaz/vmHWZbl+EXqGxtOHhWZYyYxTk8vuY+jmuB/Ie9j3zN9PStpip7hSRnoxvCzbVQMwNjk0eKAr1A2Kz2zhIIlMgmhmY7NOSxKDkqzbfUdoa6UjmxeeenwM+qMKK+qRG3O0dpI3AWt7c8Mdv+PjJL0t499Peu07vCrSr3IlRxp5kUgySFqBrhqDBl+C3POWHW9aZYRNpImiEY9e48lkZWQ0CTvjO5izUDu98ouml+9GY2MabyYlLE+ltwYE2QrVuA4uzlpr9d+nkC6dZYRTCevWDvAAI8qG2lbJPuOLGaZ1Li18jd3VTGB5YgiLp5Fpyq2wEfn0tbMSoo2ORlV0yGFtPqp3aN5JQ4SI2CjknaU55biwPiueM8dViBftQrN3QsZjlllrbGFoheftJur8C88dE1cEUBSZZizqdiguAzX6CAPdTyCPc/wCMl8dE6vc+WEwybo+1C8R0xqVmYuFa/uIPCqPevAF5tXXOnlIHbVN30GnYxPEOUpqVWFkqO4b7hJsE/FZRa7qnZhijjikh1EykTBgakVhV+onduO6yPa1JN546R0x4dQn6gQAOWppCFWksNz4H9q9xgVepnTu0waYEqQ7Da7DZQAvmt1f3A/ObZpd8u/SRf8hEQmLUGj6QZALFERAkEE8814zVeo9TaTttvV2dDH2wh/ZUNaBT5Lc8HLVtGNVOuyZ3KqiyGRa8X6SAVtaHJP8AbmstSZdZvpuOIE6j/ijH2h3nQuApFb/tO5logeaHN+xzD1Dp/qIjhf8ASTzARKTbqALNLZosPfkgcZO6g2/SyTr6VkVYe1A/lyxbe3A3WoIIA/0+asfOhvCJz3JNRB2I7itGYr6LBCkfyce/HjJLrV45/DqRjnlSCCUq8iXqu43oJiPoUgi9wCqDz7C7N3Akk/U/qdZ2AgjRCixEkBgQm4g+QTwT/t4z4m130KxgStTNKjjaNzNRG8j1fJ80b/x4miO14E/ZeTUufv8A2AiEmlc/cAaqvj5ysXtL1fXJZ0eYTrBOVSHsohtlG4UffcLskDgVkPThJNO40qbZIo5G1DSMOY6UbVB8vweeOCR/bP8AT2p1I0zPHGGVGV3lCEmMRv3NwFjcL4Y0QBeQ2aIvOLfUkSBkCegShzbg7fV58V7j84i8ln1WJ4NkgUxNBFE0cTruB7nBbzS3R48kqeOcldPi7Q0JmoacksJGRl2ncNyh1IoEDjz48GsrH1DNIzsUJhVJ0ttxZaVREG/0gHxR+fm7aCLTvFNqNTqoZGkO2OAMzSgkBkCjd6UUkKDQoKeOcqa/RnRdXDLBG+nbdER6DTDgcfy5/wB8nZoP9JY9YID+pYlBwqnt0Df8dqhgK59ZPlfzm/ZqeHPl5MYxlQxjGAyu6v0uObY0l/tEsKbaDx4b5X8f+Msc1P8AqZ1GSHRMUUFXOyVmRnCIQbYhSK5objYF8g5L4a47vTgvU2UStEruI3lcARISBscMAGNhxdmwa9PsDxn12uCSSLC6OxEbBpAe40jqF9H4HAo+CWBNZBnIBhksKVNboDbOSN6GqP22ykj58Z60WpQGd9TD+or0g2rEIE4HpsIBYJe/Oc86dvz76Zun9LcOyRLIut3bgWZAgViFBNcEMOOBw3wBeZ+lRwMkwnaRtZukXagJfdQVNpXypIX1eL88HMGg6O0bjvLJPKVbtPE5YbUrcAfYhj5Pp5/ORelaKOFoZDPJ3WLCRIh60PDcrV7VIo+9geMYb4T+jyboXEgXSDYYnqIU+3y53eSlkUOQTyeQMj6OOTY0RVkiVUd1UNIrm+4RICdw3BQxUE175Ph1LNIio/cgXvdpNSPsClV3N/7ybUDzTcmzmHo+mf8ARySRahY6V2lAf2sxNtv+RAFeRtquTeTVzJNZ4N07zBtJAHm04X1DYEtdoflfU6n1Wo9hlRFF3LRe7O0WnZlLsF7bAl2MbH7hwGB/BHvmLrEyPo4WGo7soK2CeUUpbKFHG3cApJ5PH4zx1tGjjOmV45Y1Eb9yKOwPuNMf4kBm49wQcuM7BtS0jLI0kk0fa7blYzaAEsq3Robju45Hv5ybPHLNJHHGXMfbkEMkoJLb9oNgtwAxoNV0bIN57+qOzGkbpqmfvcOiEDdGpVdzKo4LDgfIQ/HPntLMkYQzppIlJEz0e25O32s9m6Hjdf4xdzpeNniofRkSPumUkauCxGlXbLShKBoi91nnge3nPWm1KT9xJYL1bN9z7UVWRrII/wCgbNn+T85mHb/TtqIXkGujILDgHaB6yw4AUUKFWeMxazXSHTMqmObed7yhKaNu5uNtfBJayy+x5y6mRbS9OQ60JqUWKOERxloGLK7Ed296qSG2N4UXS14BrEvUnCPrjMXaRzpxHItts9SqQF/kq3x4Jsf3h6/ThlkAikhn08YoRbiZHb1tI1cBe2T+aHPxmKbSVpjIA6RvIhgRH3ATUOSTR9ShjftiQtvhl6nGscy6dGmbT6Zd5O2jG7AFrIG7Z44zz9QyqjQ2vdhaF0hjZq2NYG4ivHir9viqDRsvekgkll0quvbmdje9z6jvPI+OB5+cwx6WJU0TbXidy9yEblKCl4B5PktfsD/sOq9RQSRaadEmaOUBe7FuRVKEWVJv1FjtAVfI83mfUSSxiHWaZYozMAmyNiSjKCpZgw9MhpiKLUKurFuqdQWeRHpJdQXURNGKBjX9oCQVYJABB55PxxmPUj9TqFJEquJWbUIt7YvCih/iiR8ZItz1Xt41SbT6VEVHXbK5kHJemOw/9SFfPg/7mX0eVu3NMI9MwlkNxSFfSrMSQpZlBYGgBY/yQMwatkZW1MUimGHU2iOf3ZR6ACCbNA1xxQ/2y2+ndJF6l1tqX3T92El5RQZrraRf3L6gBW78ZWa739IwomjgCbSNiklWZwWrn1MzE835J+Ly4zUf6b9Zin0+2JJ1VOQ0xjLPd+r0EgePHHt+c27Nzw5XyYxjKhjGMBld1/pCauB4HZ1Vv5IQCD8iwR/uCMsc+HBLj88/V/0eNPPPHBMgaKN5A5DdxyVLMjkIIwxsm78AAAHxq3UuqGMl9JcSupZzG5lv1WgcsPIpjZ5sn4zdPr6HVVIdVBIjTuCH3KaVT9nbhLA3Q9TkefcnjRodN332pYehvX7UHqIAI8txZ9vJ8Zzd0jqzRCDSyJpWhCSIHmRqtSo4BHqO7lrPPP5z5pYSqy6rTEqUTmNiGYncSWO7kcgUOT73zWfdVopyJYu27yQSh2hQAxbRdfkrtHC+fxQyR1ln1EKakuBtUKUi4ZjJ4W/5FSaI+LyUk9xT6rqDuYZDGCxkLGVQblANta+49j7UAOPGXZVOokRpGI1Qm2LFQXc7YyAFJIBVgePc/GQ9KmojhGpXTUJaWKWM7QpH7NEf6Sw5FCyPPg5Z9NEiRs2qQFYCQ+yURutvuckg+reDwASBdjzxL8tTxnyo06s8LtHI8bDYkblACVUbgUUkUTyb8+eMldQi7DRyRLPp9JIBFKQCSz7fVtVvdlr+5B8eM96DpwgmlPZj1EXo2p3Adhkcqsd+CxraW+P75m6lpJUUrqpigKStpUAMisw9O2zTdwcKGIB8GzZzVZm1SzRPp4Fjmg5nYEFrshCDXyCQQKGW0E6bJ23NoyqBuzZCylKcEgj+TUKWqr85j6zJPLp0ct3IkFpI9KyuxDkgC/uKUt/9ryV1EodPBJqZi5QhZIHUowMg3FgvlttDzVjkVk8rv41B6zqElrqDTRiWRwOwgJrZGGDHm6v0knm+fGS+j9QhdpQ7SQ6eVaehvvf99EA0xagBz5/tk2GcpoGCKi6Yy7P1S3vVAzclKBBf7LPPPjkZUzaJ445oY5NQsMkiLEjReqQKyyEUPsYA7wOCeB/Z5TLEjoE+pjOqZX2OsRkBl5LLtrcST4K1Q5HHtWVOv08S6bTrJ3lmBBaxapEwNGgf5MBQ4JA/IyxnO9YdbNKs+xkhELAIdnq2iwTZUiyCOCfPAOZ3iMum1eoRIoxK8SGPfZX1KgIB5JDC644P4oryxZw3z8ajtrpdRJo0WAR9vhVb9tXBoCjQ4FnmifUeecabUldRrdQGSJ4NwWJwCl2QUFn3IagPfJPVuol2TS6i70/cELQ8dyVtvO7iq449jd5A0PUZYZGldG/U6UdsRGLcjCzv7h83yWJJ5wX7WHpukQQJOC8epaYBXYbYgOWJY+B9or5tvixh7v6oTzOVR1iJJBIMjXZY/JJNV4ofjLnpEEsunm0k0kcCNH3w3BBUBiBd8JwV45/81Op0weKOF0MUsZU7h6gEcAlmI4UCr5N8/jLGbLOk6eMPNplJgkDQEHtm91k+k/D+a88fObLpYpv1UGpg0QVO40Z/Twy9twrbVDAWAHUk7gf+2azqlDxxQLEONQe1qAO2sq0PN814IH5PnOvdM+k9Yz9Pnh1TNpViQ9ou8XbPDbtiFlcHxsJr8kHLE5V0PpnTIYFYQwxxbzuYIoFsfJNecm4xm3IxjGAxjGAxjGByr+sv03uUasSVbRxt+0WK8+lg4NqA1ex5b85yk6IicRyyOkiKbMiFbDN6aAplJWn5Nj1Crz9GfWX02NdCIi4Ta4blA6ki6BB/8H5+c4L1VNRFqHEplWZm2yS6hVIsJsXbtoFyhJ8kUPmznPl078Lsn3+KzXftEyRvbThpSYpWBVFYofJNlkDFWPq9R4Hv96NNsbTwwafZqVdmSR/TuQhtwex7Ifb4HvxmM6JQyAaYSRwnZL2ztMjMyKFJPJF1z8tftnnqsZTaWd0mstCWlUqkdG7/AJbrBo+/GRc1K16MZpIJUdZnBkjEUm2KzyjbSQAPJNgkm/nM0WrignVVhjE5BSc6kh1WtjBlbn1+eRwVNUPaF1KLvCNUiK6gC73u7ScKgBv+BJoNfyAMdA0UDtPDq2EIDhTJIvqu6a2uhsIAof6snpr3iZ0npqTdkbtNHSSSbwG/c9e0JXFbLvyaIv8AOfenw6zUahpEfuPDI0aEsgTZV3EH4DEAkMfTyOcrD04NtrRGp1ATa3gpW8qGrbdghTz4585ZfUfWQ8kckEzsqRWWZQh2hgKQ7Ruaj7gge1ZfbHiI2vbSIkDRd9opEcKu/aEnXhD6vIBIJBFfHk5n66sgkH68ieWeLbCwcADkgbh/EKxvxyKA9xmXVdPiim07RaV2/UIyHvLtXuEWPJYXtPN+T7DIOmgaHRu7jSuw1CxkS+pgwNcg/cABX9j/ALr+llm9rWdIpNTFDLpCscUe6UwAlX3UwLBRdKoNWL5yBL1eBxqFSaYJAXk0p/mTQouwFnj02TaiuAbyLoNXNojO0WqiL3sYD1cGhuWz6uPb8fjLgaePRFJINVBc0Up2zBf/AEwqqaHtJbAWOSprCKj6T6np44pN8HedgwEagsW3cc8ekD/f3HOYOl9MV9MqfuDUSSRtDHtIEoLFGIaq2Bf5XV/5z1DL+n/TvpUmEjhWpltTQAbaONzBuR+DkqWSH9TpFeaeNkV1nLmu2dx8cWpskm/xlvySemTR6qFW1idnZG5lRWk5ELHgerkblPIrya5vIvQ90Q1W/UGHuIxUunMg5II3CyWPFCvOR6de/BppBJp2lCiV+PDAhj8C65/t4yw65qdyLC9yahURtM0bUsQu33gm9xA/+OMRFSV3tH2t0tIrSKV8OLuNfagPUFHGXCxyVqZyGih1Wnkddm1lIUbDu+CW4Pj7jRyP0aKTTrNUipqQwTtyAWGkOywb+4Kd98ji8znSSSRTsjRQLEwjnQMwUopCqSQCKMnhVHqO7zgnXbbv6faPUzyKh07y6I7REuohjkj2CjbErasAbFEbuBRrOmfQ0HVFfUf/AJBkK2oiCbNgq/s2gMFqhT88f3J1H6L+jlnfSa6DVXFCoUxNEwMbLXEd7SLWgWIsjnkGh1zNRz5GMYzTJjGMBjGMBjGMBnM/6rdIhEbMxJfVOiAvJSx7SGGwAcljwbINFqIzpmYdXpI5V2yxpItg7XUMLHg0eLyWa1xuV+WSvcorBHRLRinq5PUQ4PFj0mmPq/7Z41WmKpqE2BmCW4lPqVyoNirLDaARdck1nUPrf6Xli1Gplg0kZ08iLvbZGyJ5YuEB7okDAH0CjfPjjTdZ9LaoJHIIp5INRHsaQQFpeSAdykF+Sthtov5oi8eHWd1Q9V1rt+j3alDsZg8kaepVJT1MbII49IoeL98yaPSaJe8suolMbqGXaWpjVlePSZA2002SpI3j0cqIFUzOEZiEAUEiM2v3ITtHHNWRQ5IwdT1EjrFptiwRRB1aUWQxCgFRVDgg0D7knyMhmscSEfpHfWMGN87g20Mt7hu8Ww238gZG1HYVQZZzOICVRKpZFsL6SB5C03JItSPjPiKipqYFaB0WPcHZDdkByAw/kCNoPP8A9ep+ozTLDpCEmjLK+2Oiw2qQFLUAKXz/AOML7/a16x3VT17AkkhWDuTluy+0EyEgA7q8NyBf4s4UnijVp/00LxtH2lAlBJZdyF/nbdNfmlB98xvGytNNDBIqQLGrJKO4Abtjd2qgUSqg8fFZF6OWheWXuRd7coMDKRuO8AIp8cg38UDzk/jW95XzTusKxxrEUXUwbZXljNA3/wA2M/24PNc/nMutEfaTTAKY0IL6uNSaVhRjJqgSxF8kWB8nMyafVR6mDe0e3YZIYr9OxmLFAQOBYo+eKz70jq2omGo00HbWOUFAtH0iQlu2o54Uki/PAxy+U4XzPl81g7jACUSRaRgIEkXa8gci6BFE2OPkD2OV2rmSQ6ueNmj8AxeSULBWDH2PvfgDjJXTdRI0sgnVZhp4ZFKMwUUAxO2/ng3/APeevp3Ty6dWZmijWbTGRO4CwkBG1l8cn5X8j5vL1Jqd8rkY52i2ad9skencFJthoyV6gNoIsAVz4Pp+M+w9JlaWbZHJJKsaPFsItVJFAgcNS2CFuz+cjafQq8MG4vCxaxKwBj2USargOGA9Pkg2cs9P1WRdjpatHcc8sZoBbO0IQ1eqySw558+cv9T30kahBqpLMzDSNtDSuVG2Q0GIH3ORt9KgEmqHFnLeDQNNNF02CbvaSgG2KYgz7SQz77ohSOAd1gek8ZJ+mfpptXqAqRSHRGQOrDcoFVuJY0yvyaAoG/fnOu6H6J0cU6ahI2EqKF3dxzuoUCwumYD3P4+BST4TlflZdC6LDpIhDAhRASaLMxs/JYkn/f4ywxjOjiYxjAYxjAYxjAYxjAYxjAZq3119JnXrEFkRDG+79yMyL8WBuWmHsbzacYWXHDf6iTAvPplhgDjsp3doM2ofcqgSSChTcWD/AJPtmqdT6U8UYWVWSGYoUjhcMjSUaJU+CxHmgvHP57nH9KGGHVCNxJJOSf3I46rczBaoKW9R9T2PHtxmg9Q+hRAU1WpBeJiiNpzFDv8AKhVDqyxRoWrgeLNWW45W5e3fjxlnV/X7aEA+nhni4VyZDGrISXDAUV22rNsa7H2+/AzFq4klSNdNCyTgEjZYqyOX3DwFsKVIN7uCDQvOh6aER6kTHasYkdJi695ShMauy+olRewopIYD34BqpDJOsf7c7ardGz24BMZs7VsgepvUNoFc+DVzTPv32dOkmhjc7N0PIEj8kyFmG1eOQZOL21wQTlLHpEMg7olLgnvIqkc1a0FFAX7D2y6jgj7sULs0SEBqjlWQd0WSSVLAFfTa/liQarMusdo42aUyLrJDSMPQtKB61IpXSvTyGPI8EHLmeC23N9K/VaVJJdORJshIIimbzu4JDEmwguxftmPp8Xbim3wd7eXVZhfk/wDqWBe3jcCa4I4PJye2m7YiYKsDkMTJOxKPwDsvn1gizzZDDhhRGODXyBYViMqu7kuh2Q37UjLtY80dnNVziTpLdvbzpNKiSRrJ2hLEvcMkkhkjmTYWC0asAjkfIrMf02NzRk7o5IY2YM7AgggkVG3G3j+JXz75M6uAx1TBTHIBDG0cpJldvBq/UqlFNnd9tmuc3T6U+ktexVlVUhZfSH7ZEZoKyupXc5Zbpl5ogFlIxC4590TSFo4o5EPblsqsTKGkcDhmJIoCxRPA3NZ5rLbpYEkKLJpu88jhZJaeNo2XwoKit5v0kr/H+Q9ObAv9MuoCE7YY1nhkUhhIgMg2tu7ZHFFiCFkCjjxnTvor6Mi0O6QF+5Ko3qSpVSfU22lBotzySPgKOM1msfli2+mukJpdPHEhcgAWZCC3+aAHHjgAZaYxm2LdMYxhDGMYDGMYDGMYDGMYDGMYDGMYDMc8CupV1VlPlWAIPv4P5zJjAi6jpsLqVeKNlZdhBUG1/wBPj7fxnMfrP+lwll066VHEJtZD3jaA/wAjvJZh8KLqvHJOdYxks1qcrHP9J/S+IQiN52LoxMUkSCPYpABUqSyte0Xf+KzJ/wDrHTtPJJM3ejkosjrT7gCo2yIVKr7gAWPnN8xkvCLP8nKON/Un9NtRDFL2ZpJoWaylyNIqctSpuKOd1chQQBYBPm6+lvovUxNpZRO3ZK3LFJ6WDXYatpu+LRiu02bPAHSsY/Hs/PrGHV6SOVWSRFdGFMrKCCPgg8EZ608CxqqIqoqilVQAAPgAeBmTGaYMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgMYxgf/9k=' };
      default:
        return { uri: 'https://via.placeholder.com/150/90EE90/FFFFFF?text=Crop' };
    }
  };

  // --- Function to go back to form to edit parameters ---
  const handleEditForm = () => {
    // Navigate back to the form page
    router.replace('/soil/soildetection'); 
  };

  // --- Comparison Logic ---
  const getSoilComparisonData = (): SoilParameter[] => {
    return [
      { name: 'Nitrogen (N)', yourValue: nitrogen, optimalMin: optimalRanges.N.min, optimalMax: optimalRanges.N.max, unit: 'kg/ha' },
      { name: 'Phosphorus (P)', yourValue: phosphorus, optimalMin: optimalRanges.P.min, optimalMax: optimalRanges.P.max, unit: 'kg/ha' },
      { name: 'Potassium (K)', yourValue: potassium, optimalMin: optimalRanges.K.min, optimalMax: optimalRanges.K.max, unit: 'kg/ha' },
      { name: 'pH Level', yourValue: ph, optimalMin: optimalRanges.pH.min, optimalMax: optimalRanges.pH.max, unit: '' },
    ];
  };

  const getMatchStatus = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return { text: 'Perfect', color: '#4CAF50' }; 
    if (value < min) return { text: 'Low', color: '#FF9800' }; 
    return { text: 'High', color: '#E53935' }; 
  };
  
  // --- Renderer for Comparison Table ---
  const renderSoilComparison = (data: SoilParameter[]) => (
    <View style={styles.comparisonTable}>
      <Text style={styles.comparisonTitle}>Soil Parameter Comparison (Input Data)</Text>
      <View style={styles.comparisonHeader}>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 2 }]}>Parameter</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Your Soil</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Optimal</Text>
        <Text style={[styles.comparisonCell, styles.comparisonHeaderText, { flex: 1 }]}>Match</Text>
      </View>
      {data.map((param, index) => {
        const value = parseFloat(String(param.yourValue));
        const status = getMatchStatus(value, param.optimalMin, param.optimalMax);
        return (
          <View key={index} style={styles.comparisonRow}>
            <Text style={[styles.comparisonCell, { flex: 2 }]}>{param.name}</Text>
            <Text style={[styles.comparisonCell, { flex: 1 }]}>{param.yourValue} {param.unit ? `(${param.unit})` : ''}</Text>
            <Text style={[styles.comparisonCell, { flex: 1 }]}>{param.optimalMin}-{param.optimalMax}</Text>
            <Text style={[styles.comparisonCell, { flex: 1, color: status.color, fontWeight: '600' }]}>{status.text}</Text>
          </View>
        );
      })}
    </View>
  );

  // --- Renderer for Recommendation Card ---
  const renderRecommendationCard = (crop: CropRecommendation, index: number) => (
    <View key={crop.id} style={styles.imageResultCard}>
      <Image
        source={getCropImageSource(crop.imagePlaceholder)}
        style={styles.cropImage}
        resizeMode="cover"
      />

      <View style={styles.resultDetailsContainer}>
        <View style={styles.rankContainer}>
          <Text style={styles.cropRank}>TOP #{index + 1}</Text>
          <Text style={styles.cropName}>{crop.name}</Text>
        </View>

        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${crop.matchScore}%` }]}>
              <Text style={styles.progressBarText}>{crop.matchScore}% Match</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.viewDetailButton}>
          <Text style={styles.viewDetailButtonText}>View Details</Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#2E7D32" style={{marginLeft: 5}}/>
        </TouchableOpacity>

      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Analyzing parameters and generating recommendations...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Text style={styles.title}>✅ Crop Prediction Results</Text>
        <Text style={styles.subtitle}>Based on your input parameters (Temp: {temperature}°C, Rain: {rainfall}mm).</Text>
      </View>

      {/* --- EDIT FORM BUTTON (To go back to form) --- */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditForm}
      >
        <MaterialCommunityIcons name="pencil" size={18} color="#2E7D32" style={{marginRight: 8}}/>
        <Text style={styles.editButtonText}>Edit Parameters / Re-analyze</Text>
      </TouchableOpacity>


      {/* --- Results Section --- */}
      {results && (
        <View style={styles.resultsSection}>
          
          {/* 1. Recommended Crops */}
          <Text style={styles.sectionTitle}>Top Recommended Crops</Text>
          <View style={styles.resultsGrid}>
            {results.map(renderRecommendationCard)}
          </View>

          {/* 2. Soil Comparison */}
          {renderSoilComparison(getSoilComparisonData())}

        </View>
      )}
      
      <View style={{height: 50}}/> 

    </ScrollView>
  );
};

// --- Styles (Updated/Cleaned) ---
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 14, 
    color: '#607D8B', 
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 15,
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A5D6A7', 
  },
  editButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsSection: {
    marginBottom: 50,
  },
  resultsGrid: {
    marginBottom: 20,
    gap: 15, 
  },
  imageResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 6, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15, 
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0', 
  },
  cropImage: {
    width: width * 0.35, 
    height: 'auto',
    minHeight: 130,
  },
  resultDetailsContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  rankContainer: {
    marginBottom: 5,
  },
  cropRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  cropName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2E7D32',
  },
  progressBarWrapper: {
    paddingVertical: 5,
  },
  progressBarContainer: {
    height: 22,
    backgroundColor: '#E0E0E0',
    borderRadius: 11, 
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50', 
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  progressBarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)', 
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  viewDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: '#E8F5E9',
  },
  viewDetailButtonText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: 14,
  },
  comparisonTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
  },
  comparisonHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#388E3C',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 5,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  comparisonHeaderText: {
    fontWeight: 'bold',
    color: '#388E3C',
    fontSize: 14,
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 5,
  },
  comparisonCell: {
    fontSize: 13,
    color: '#455A64',
    textAlign: 'center',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
});

export default CropRecommendation;