import { message } from 'antd';
export const customMessage = (type, content) => {
  message.config({
    top: '10vh',
    duration: 4,
  });

  if (type === 'success') {
    message.success(content);
  } else if (type === 'error') {
    message.error(content);
  } else if (type === 'info') {
    message.info(content);
  } else if (type === 'warning') {
    message.warning(content);
  }
};
