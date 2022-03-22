import axios from 'axios';

const config = { responseType: 'blob' };
export var getFileFromUrl = () => axios.get(url, config).then(response => {
            console.log(new File([response.data], fileName));
            return new File([response.data], fileName);
        });

