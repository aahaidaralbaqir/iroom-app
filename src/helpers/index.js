import {
   Share
} from 'react-native';

export const validateEmail = values => {
    const patternEmail =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const result = patternEmail.test(values);
    return result;
}


export const handleShare = async () => {
   try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
   } catch (error) {
      alert(error.message);
   }
}

export const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getAcronym = (str) => {
  let string = str
  let acronym = string.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
  return acronym.toUpperCase().split("",2)
}