/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

export const Container = {};
export const FormContainer = {
  marginBottom: '0',
  maxWidth: '450px',
  padding: '0px',
  margin: '0 auto'
};
export const FormSection = {margin: '0 0 5px'};
export const FormField = {};
export const SectionHeader = {display: 'none', padding: '2px', margin: 0};
export const SectionBody = {};
export const SectionFooter = {};
export const SectionFooterPrimaryContent = {};
export const SectionFooterSecondaryContent = {};
export const Input = {};
export const Button = {
  background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(255,157,45,.8), rgba(255,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`,
  borderRadius: '4px'
};
export const PhotoPickerButton = {
  display: 'none'
};
export const PhotoPlaceholder = {
};
export const SignInButton = {};
export const SignInButtonIcon = {};
export const SignInButtonContent = {};
export const Strike = {};
export const StrikeContent = {};
export const ActionRow = {};
export const FormRow = {};
export const A = {
  color: 'steelblue'
};
export const Hint = {};
export const Radio = {};
export const Label = {};
export const InputLabel = {};
export const AmazonSignInButton = {};
export const FacebookSignInButton = {};
export const GoogleSignInButton = {};
export const OAuthSignInButton = {};
export const Toast = {};
export const NavBar = {};
export const NavRight = {};
export const Nav = {};
export const NavItem = {};
export const NavButton = {};

const awsCustomTheme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formField: FormField,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  photoPickerButton: PhotoPickerButton,
  photoPlaceholder: PhotoPlaceholder,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  amazonSignInButton: AmazonSignInButton,
  facebookSignInButton: FacebookSignInButton,
  googleSignInButton: GoogleSignInButton,
  oAuthSignInButton: OAuthSignInButton,

  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,

  hint: Hint,
  radio: Radio,
  label: Label,
  inputLabel: InputLabel,
  toast: Toast,

  navBar: NavBar,
  nav: Nav,
  navRight: NavRight,
  navItem: NavItem,
  navButton: NavButton
};

export default awsCustomTheme;
