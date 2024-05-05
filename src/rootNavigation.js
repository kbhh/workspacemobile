import React, {Component} from 'react';
import { 
    createStackNavigator, createDrawerNavigator, createSwitchNavigator,
} from "react-navigation";

import Sidebar from './sidebar'
import HelpScreen from './help'
import AboutScreen from './about'
import SettingScreen from './setting'
import TourScreen from './tour'
import AddTourScreen from './tour/addTour'
import GuestScreen from './guest'
import GuestDetailScreen from './guest/guestDetail'
import AddGuestScreen from './guest/addGuest'
import AddMeetupSession from './guest/addMeetupSession'

import AccountScreen from './account'
import ProfileScreen from './account/profile'
import BillingScreen from './account/billing'
import CompanyScreen from './account/company'
import AddCompanyScreen from './account/addCompany'
import EditProfileScreen from './account/editProfileField'

import CompanyDetailScreen from './common/company';

import BlueFaceScreen from './blueface'
import BFCommentScreen from './blueface/comment'

import CommunityScreen from './community'
import MessageScreen from './community/message'

import EventScreen from './event'
import EventIntroScreen from './event/intro'
import EventBankVoucherUploadScreen from './event/bankVoucherUpload'
import EventPaymentChoiceScreen from './event/paymentChoice'
import AddEventScreen from './event/addEvent'
import AddMeetingScreen from './event/addMeeting'
import SelectMeetingRoomScreen from './event/selectMeetingRoom'
import SelectMeetingAddonsScreen from './event/selectMeetingAddons'
import EventDetailScreen from './event/eventDetail'
import SelectEventSpaceScreen from './event/selectEventSpace'
import SelectAddonsScreen from './event/selectAddons'
import MeetingDetailScreen from './event/meetingDetail'

import HomeScreen from './home'
import NotificationScreen from './notification'
import MessagesScreen from './notification/messages'

import ServiceScreen from './bluespaceservice'
import AddServiceScreen from './bluespaceservice/addService';
import ServiceDetailScreen from './bluespaceservice/serviceDetail';

import SupportScreen from './support';
import TicketScreen from './support/ticket'
import TicketFeedback from './support/ticketFeedback'
import TicketForm from './support/supportForm'

import WorkSpaceScreen from './workspace'
import WorkSpaceList from './workspace/workspaceList'
import FinishWorkspaceBooking from './workspace/finishBooking'
import FinishWorkspaceBookingVoucherUpload  from './workspace/finishBookingVoutcherUpload'
import AddWScreen from './workspace/add/index'
import AddWorkspaceSuccessScreen from './workspace/add/success'
import DetailWScreen from './workspace/detail'
import PaymentWScreen from './workspace/payment'
import PaymentDetail from './workspace/bill'

import LoginScreen from './login'
import ForgotScreen from './login/forgetPassword'
import SingupScreen from './signup'
import SingupScreen2 from './signup/next'

import LocationScreen from './location'
import LocationDetailScreen from './location/locationDetail'
import LocationIntroScreen from './location/intro'

import AppIntroScreen from './appintro';
import LandingScreen from './landing';
import workspaceList from './workspace/workspaceList';

import TermsScreen from './common/terms'

const AppIntro  = createSwitchNavigator(
    {
        AppIntroScreen
    }
)

const BeforeLogin = createStackNavigator(
    {
        Landing: { screen: LandingScreen },
        Signup: { screen: SingupScreen },
        Signup2: { screen: SingupScreen2 },
        Login: { screen: LoginScreen },
        ForgotPassword: { screen: ForgotScreen },

    },
    {
        initialRouteName: 'Landing',
        navigationOptions: {
            headerBackTitleVisible: false,
            headerBackTitle: null,
            headerTintColor: '#6D6D6D',
        }
    }
);

const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Notification: { screen: NotificationScreen },
        Messages: { screen: MessagesScreen },

        Account: { screen: AccountScreen },
        Profile: { screen: ProfileScreen },
        Billing: { screen: BillingScreen },
        Company: { screen: CompanyScreen },
        AddCompany: { screen: AddCompanyScreen },
        EditProfile: { screen: EditProfileScreen },

        CompanyDetail : { screen: CompanyDetailScreen },

        BlueFace: { screen: BlueFaceScreen },
        BlueFaceComment: { screen: BFCommentScreen },

        Community: { screen: CommunityScreen },
        Message: { screen: MessageScreen },
        
        Event: { screen: EventScreen },
        EventIntro: { screen: EventIntroScreen },
        EventPaymentChoice: { screen: EventPaymentChoiceScreen},
        EventBankVoucherUpload: { screen: EventBankVoucherUploadScreen},
        AddEvent: { screen: AddEventScreen },
        EventDetail: { screen: EventDetailScreen },
        SelectEventSpace: { screen: SelectEventSpaceScreen },
        SelectAddons: { screen: SelectAddonsScreen },
        MeetingDetail: { screen: MeetingDetailScreen },

        AddMeeting: { screen: AddMeetingScreen},
        SelectMeetingRoom: { screen: SelectMeetingRoomScreen},
        SelectMeetingAddons: { screen: SelectMeetingAddonsScreen},

        Service: { screen: ServiceScreen },
        AddService: { screen: AddServiceScreen },
        ServiceDetail: { screen: ServiceDetailScreen },

        Location: { screen: LocationScreen },
        LocationDetail: { screen: LocationDetailScreen },
        LocationIntro: { screen: LocationIntroScreen },

        Support: { screen: SupportScreen },
        Ticket: { screen: TicketScreen },
        TicketForm: { screen: TicketForm },
        TicketFeedback: { screen: TicketFeedback },

        Settings: { screen: SettingScreen },
        
        WorkSpace: { screen: WorkSpaceScreen },
        WorkSpaceList: {screen: workspaceList},
        AddWorkSpace: { screen: AddWScreen },
        AddWorkspaceSuccess: { screen: AddWorkspaceSuccessScreen },
        DetailWorkSpace: { screen: DetailWScreen },
        PaymentWorkSpace: { screen: PaymentWScreen },
        FinishWorkspaceBooking: { screen: FinishWorkspaceBooking },
        FinishWorkspaceBookingVoucherUpload: { screen: FinishWorkspaceBookingVoucherUpload },

        About: { screen: AboutScreen},
        Help: { screen: HelpScreen },
        
        Guest: { screen: GuestScreen },
        GuestDetail: { screen: GuestDetailScreen },
        AddGuest: { screen: AddGuestScreen },
        AddMeetupSession: {screen: AddMeetupSession},
        
        Tour: { screen: TourScreen },
        AddTour: { screen: AddTourScreen },

        Terms: { screen: TermsScreen },

    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerBackTitleVisible: false,
            headerBackTitle: null,
            headerTintColor: '#6D6D6D',
        }
    }
);

const DrawerNav = createDrawerNavigator(
    { AppNav: { screen: HomeStack }, },
    {
        intialRouteName: 'AppNav',
        contentComponent: props => <Sidebar {...props} />,
    }
);

export default createRootNavigator = (signedIn, generic) => {
    return createSwitchNavigator(
        {
            AuthStack: { screen: BeforeLogin },
            HomeNav: DrawerNav,
        },
        {
            initialRouteName: generic ? 'AuthStack' : signedIn ? 'HomeNav' : 'AuthStack'
        }
    )
}
