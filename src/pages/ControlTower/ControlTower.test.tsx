import userEvent from '@testing-library/user-event';

import { usersData } from 'test/data';
import { render, screen, within, waitFor } from 'test/test-utils';
import ControlTower from './ControlTower';

test('renders control tower with profile tab selected', () => {
  render(<ControlTower />);
  const tabpanel = screen.getByRole('tabpanel');

  expect(screen.getByRole('heading', { name: /control tower/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /profile/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /team/i })).toBeInTheDocument();
  expect(within(tabpanel).getByText(/account owner/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/company name/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/work email/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/address/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/work phone number/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/company e-mail/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/additional number/i)).toBeInTheDocument();
  expect(within(tabpanel).getByText(/company url/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset user's password/i })).toBeInTheDocument();

  expect(screen.queryByRole('heading', { name: /users/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /add new user/i })).not.toBeInTheDocument();
  expect(screen.queryByTestId('team-table')).not.toBeInTheDocument();
});

test('switches to team tab', async () => {
  render(<ControlTower />);

  userEvent.click(screen.getByRole('tab', { name: /team/i }));

  expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add new user/i })).toBeInTheDocument();
  expect(screen.getByTestId('team-table')).toBeInTheDocument();

  const tabpanel = screen.getByRole('tabpanel');
  expect(within(tabpanel).queryByText(/account owner/i)).not.toBeInTheDocument();
  expect(within(tabpanel).queryByText(/company name/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /reset user's password/i })).not.toBeInTheDocument();

  await waitFor(() => {
    usersData.forEach((user) => {
      expect(screen.getByRole('cell', { name: user.userName })).toBeInTheDocument();
    });
  });
});

describe('Profile tab', () => {
  test('toggles user detail edit mode', async () => {
    render(<ControlTower />);

    const accountOwnerEditButton = screen.getByTestId('edit-accountOwner');

    expect(screen.queryByLabelText(/account owner/i)).not.toBeInTheDocument();

    userEvent.click(accountOwnerEditButton);

    const accountOwnerInput = screen.getByLabelText(/account owner/i);

    expect(accountOwnerInput).toBeInTheDocument();

    userEvent.type(accountOwnerInput, ' ');
    userEvent.click(screen.getByRole('tab', { name: /profile/i }));

    await waitFor(() => expect(screen.queryByLabelText(/account owner/i)).not.toBeInTheDocument());
  });

  test('updates user detail', async () => {
    render(<ControlTower />);

    const accountOwnerEditButton = screen.getByTestId('edit-accountOwner');

    userEvent.click(accountOwnerEditButton);

    const accountOwnerInput = screen.getByLabelText(/account owner/i);

    const updatedValue = 'Account owner updated';

    userEvent.type(accountOwnerInput, updatedValue);
    userEvent.keyboard('{enter}');

    await waitFor(() => expect(screen.getByText(updatedValue)).toBeInTheDocument());
  });
});

describe('Team tab', () => {
  test('cicking on "Add new user" opens add new user modal', async () => {
    render(<ControlTower />);

    userEvent.click(screen.getByRole('tab', { name: /team/i }));
    userEvent.click(await screen.findByRole('button', { name: /add new user/i }));

    const presentation = screen.getByRole('presentation');

    expect(within(presentation).getByRole('heading', { name: /new user/i })).toBeInTheDocument();
    expect(within(presentation).getByLabelText(/name/i)).toBeInTheDocument();
    expect(within(presentation).getByLabelText(/work email/i)).toBeInTheDocument();
    expect(within(presentation).getByLabelText(/work phone number/i)).toBeInTheDocument();
    expect(within(presentation).getByLabelText(/additional number \(optional\)/i)).toBeInTheDocument();
    expect(within(presentation).getByLabelText(/role/i)).toBeInTheDocument();
    expect(within(presentation).getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(within(presentation).getByRole('button', { name: /add new user/i })).toBeInTheDocument();
    expect(within(presentation).getByRole('button', { name: /add new user/i })).toBeDisabled();
  });

  test('clicking on user row/cell opens user details modal', async () => {
    render(<ControlTower />);

    userEvent.click(screen.getByRole('tab', { name: /team/i }));

    const user = usersData[0];

    userEvent.click(await screen.findByRole('cell', { name: user.userName }));

    const presentation = screen.getByRole('presentation');

    expect(within(presentation).getByText(/user details/i)).toBeInTheDocument();
    expect(within(presentation).getByText(user.userName)).toBeInTheDocument();
    expect(within(presentation).getByRole('button', { name: new RegExp(user.userRole, 'i') })).toBeInTheDocument();
    expect(within(presentation).getByText(user.userEmail)).toBeInTheDocument();
    expect(within(presentation).getByText(user.profile.workPhoneNumber)).toBeInTheDocument();
    expect(within(presentation).getByText(/additional number/i)).toBeInTheDocument();
  });
});
