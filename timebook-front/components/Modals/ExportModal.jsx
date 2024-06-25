import { Modal } from 'react-bootstrap';
import React from 'react';
import { Button } from '../';
import { toaster } from '../../lib';

import { exportActivities } from '../../api/activities';

const ExportModal = ({ show, hide, filters }) => {
  const handleClick = async () => {
    let data = {
      ...(filters.projectId && { projectId: filters.projectId }),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.from && { from: filters.from }),
      ...(filters.to && { to: filters.to }),
    };
    try {
      await exportActivities(data);
      hide();
      toaster.success('Fisierul excel se descarca.');
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      toaster.error('Eroare la descarcare!');
    }
  };

  return (
    <Modal className="" size="" centered show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmă acțiunea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(filters).length > 1 ? (
          <div className="text-lg font-base">
            Urmeaza sa descarci raportul de activitati cu urmatoarele filtre:
          </div>
        ) : (
          <div className="text-lg font-base">Urmeaza sa descarci raportul de activitati</div>
        )}
        {filters.user._id && (
          <h3>{'Nume persoana: ' + filters.user.first_name + ' ' + filters.user.last_name}</h3>
        )}
        {filters.project._id && <h3>{'Nume proiect: ' + filters.project.name}</h3>}

        {filters.from && <h3>{'Data inceput: ' + filters.from}</h3>}
        {filters.to && <h3>{'Data sfarsit: ' + filters.to}</h3>}
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex justify-between">
          <Button
            className="text-accent border-accent border-solid border-1 hover:text-white hover:bg-accent transition ease-in-out duration-150 p-1.5 rounded px-3 text-center"
            onClick={hide}
          >
            <span className="">Anulează</span>
          </Button>
          <Button
            className="dark:text-blue-500 dark:border-blue-500 dark:hover:text-white dark:hover:bg-blue-500 text-primary border-primary border-solid border-1 hover:text-white hover:bg-primary transition ease-in-out duration-150 p-1.5 rounded px-3 text-center"
            onClick={handleClick}
          >
            <span>Confirma</span>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportModal;
