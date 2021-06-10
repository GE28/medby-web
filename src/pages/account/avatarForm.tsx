/* eslint-disable import/no-duplicates */
import React, { FC, useCallback, useContext } from 'react';

import { FiUser, FiCamera } from 'react-icons/fi';

import { toastContext } from '../../global/ToastContext';
import { userContext } from '../../global/UserContext';

import { AvatarFakeForm } from './styles';

import InputContainer from '../../components/inputContainer';
import AvatarContainer from '../../components/avatarContainer';

type inputEvent = React.ChangeEvent<HTMLInputElement>;

const mb = (value: number) => {
  return value * 1024 * 1024;
};

// not really a form
const AvatarForm: FC = () => {
  const { user, updateAvatar } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const handleAvatar = useCallback(async (e: inputEvent) => {
    if (!e.target?.files) {
      return;
    }

    const file = e.target.files[0];

    switch (file.type) {
      case 'image/jpeg':
        break;
      case 'image/png':
        break;
      default:
        addToast({
          title: 'Formato inválido',
          message: 'São aceitas somente imagens do tipo .PNG e .JPEG',
          type: 'error',
        });
        return;
    }

    if (file.size > mb(1)) {
      addToast({
        title: 'Arquivo muito grande',
        message: 'A imagem que tentou enviar supera 1MB de tamanho',
        type: 'error',
      });
    }

    try {
      await updateAvatar(file);
    } catch (err) {
      if (!err.response) {
        addToast({
          title: 'Falha ao enviar imagem',
          message: 'O servidor está offline',
          type: 'error',
        });
      }

      addToast({
        title: 'Falha ao atualizar avatar',
        message: 'Confira a imagem e tente novamente',
        type: 'error',
      });
    }

    addToast({
      title: 'Foto atualizada com sucesso!',
      type: 'success',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AvatarFakeForm className="avatar-form">
      <div className="user-container">
        <div className="avatar-container">
          <AvatarContainer imageSrc={user.data.avatar} size={96} />

          <label className="avatar-label">
            <FiCamera /> Enviar imagem
            <input
              type="file"
              name="avatar"
              capture="user"
              onChange={(e) => handleAvatar(e)}
            />
          </label>
        </div>
        <InputContainer
          label="Nome completo"
          inputId="fullName"
          icon={FiUser}
          defaultValue={user.data.name}
          disabled
        />
      </div>
    </AvatarFakeForm>
  );
};

export default AvatarForm;
