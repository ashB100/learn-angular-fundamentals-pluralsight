import { FormControl } from '@angular/forms';

export function restrictedWords(words) {
    return (control:FormControl):{[key:string]:any} => {
        if (!words) return null;
        
        let invalidWords = words
            .map(word => control.value.includes(word) ? word : null)
            .filter(word => word != null);

        let error = {
            'restrictedWords': invalidWords.join(', ')  
        };

        return invalidWords && invalidWords.length > 0 ? error : null; 
    };
}