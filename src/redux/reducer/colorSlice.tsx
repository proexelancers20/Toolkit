import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setColor: state => {
      state.value = randomRgb();
    },
    setStaticColor: (state, action) => {
        console.log('Get Data', state.value, action?.payload);
    }
  },
});

export const { setColor, setStaticColor } = colorSlice.actions;

export default colorSlice.reducer;