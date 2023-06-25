import { FC, useContext, useState } from 'react';
import * as yup from 'yup';
import { Modal } from 'components/ui';
import FirstPage from './pages/First';
import SecondPage from './pages/Second';
import Documents from './pages/Documents';
import ThirdPage from './pages/Third';
import { Form, Formik } from 'formik';
import { PipelineFormContext, PipelineFormSteps, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import TeamUsersPage from './pages/TeamUsers';
import ProductsPage from './pages/Products';

interface ProductModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const validationSchema = yup.object({
  dealStageName: yup.string().required('Required'),
});

const HyperFunnelModal: FC<ProductModalProps> = ({ open, toggleOpen }) => {
  const { form } = useContext(PipelineFormContext);
  const [step, setStep] = useState<number>(PipelineFormSteps.FIRST);

  const { pipelines, editPipeline, setEditPipeline } = usePipelines();

  const editPipelineFormData = () => {
    if (!editPipeline) {
      return form;
    }
    const filtered = pipelines.filter((p) => p.pipelineId === editPipeline)[0];
    return filtered;
  };

  const submit = () => {
    console.log('submit data');
  };

  const onClose = () => {
    setStep(PipelineFormSteps.FIRST);
    setEditPipeline(null);
    toggleOpen();
  };

  return (
    <PipelineFormContext.Provider value={{ form: editPipelineFormData(), onClose: toggleOpen, step, setStep }}>
      <Modal open={open} onClose={onClose}>
        <Formik
          initialValues={editPipelineFormData()}
          onSubmit={submit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          <Form>
            {step === PipelineFormSteps.FIRST && <FirstPage />}
            {step === PipelineFormSteps.SECOND && <SecondPage />}
            {step === PipelineFormSteps.SECOND_DOCUMENTS && <Documents />}
            {step === PipelineFormSteps.SECOND_OWNERS && <TeamUsersPage />}
            {step === PipelineFormSteps.SECOND_PRODUCTS && <ProductsPage />}
            {step === PipelineFormSteps.THIRD && <ThirdPage />}
          </Form>
        </Formik>
      </Modal>
    </PipelineFormContext.Provider>
  );
};

export default HyperFunnelModal;
