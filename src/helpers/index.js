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
