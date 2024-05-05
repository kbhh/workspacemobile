import React, { Component } from 'react'
// import { View } from 'native-base'
import { View, Text, AsyncStorage, Alert, Linking, LinkingIOS } from 'react-native'
import { connect } from 'react-redux'
import WorkspaceLocation from './location'
import WorkspaceDesk from './desk';
import WorkspacePackage from './package';
import PaymentChoice from './paymentChoice';
import WorkspacePayment from './payment';
import { HeaderBackButton } from 'react-navigation'
import { styles } from './styles';
import { Loading, Popup, CustomIcon } from '../../common';
import { fetchLocations } from '../../location/actions';
import { fetchAvailable, uploadImage, addWorkspace } from '../actions';
import ImagePicker from "react-native-image-picker";
import HeaderTitle from '../../common/HeaderTitle';
import { URL } from '../../interceptor';
import { Icon } from 'native-base';
import SubscriptionSuccess from './success';
import UploadImage from '../../common/UploadImage';

const sortPricing = (pricing1, pricing2) => {
    if (pricing1.duration < pricing2.duration)
        return -1;
    if (pricing1.duration > pricing2.duration)
        return 1;
    return 0;
}

const findPrevStep = (step) => {
    switch(step){
        case 'location':
            return 'location'
        case 'desk':
            return 'location'
        case 'package':
            return 'desk'
        case 'payment': 
            return 'summary'
        case 'summary':
            return 'package'
        default:
            return 'location'
    }
}

class Screen extends Component {
    static navigationOptions = ({ navigation }) => {
        let goBack = navigation.goBack;
        let getAdded = navigation.getParam('getAdded', () => false)
        // let changeStep = navigation.getParam('changeStep', goBack)
        // if(getSteps().added)
        let prevStep = navigation.getParam('prevStep', goBack)
        let added = getAdded()
        // let nextStep = navigation.getParam('nextStep', '')
        return {
            headerLeft: <HeaderBackButton onPress={() => {
                console.log('> added', added)
                if(added)
                    prevStep(true)
                else
                    prevStep()
            }} tintColor={'#999'} />,
            headerTitle: (<HeaderTitle title='Book workSpace' />),

        };
    }
    
    constructor(props) {
        super(props)

        this.state = {
            workspace: {

            },
            prevStep: '',
            step: '',
            nextStep: '',
            loading: false,
            deskType: '',
            service: '',
            location: '',
            startDate: '',
            error: {
                package_: '',
                startDate: ''
            },
            paymentType: 'bank',
            pickImage: null,
            unit: 'day',
            total: 0,
            duration: 1,
            pricing: '',
            capacity: 1,
            passType: 'full',
            paymentImage: '',
            accessToken: '',
            modalVisible: false,
            active: false,
            agreed: false,
            added: false,
            stepsStack: [],
            showImagePicker: false,
        }
    }

    prevStep = (empty, cb, params) => {
        if(!this.state.stepsStack.length && empty)
            this.props.navigation.goBack()
        else {
            let stepsStack = [...this.state.stepsStack]
            let prevStep = stepsStack.pop()
            if(!stepsStack.length || prevStep == 'success') this.props.navigation.goBack()
            else this.setState({step: stepsStack[stepsStack.length - 1], stepsStack: stepsStack}, () => {
                if(cb) cb(params)
                console.log('> prev step', prevStep)
            })
        }
    }

    nextStep = (step, cb, params) => {
        this.setState({stepsStack: [...this.state.stepsStack, step], step: step, loading: false}, () => {
            if(cb) cb(params)
            console.log('> next step', step)
        })
    }

    getImageUrl = (fileName) => {
        let url = `${URL}Containers/location/download/${fileName}?access_token=${this.state.accessToken}`
        // console.log(url)
        return url
    }

    isActive = () => {
        if(this.state.total > 0 && this.agreed)
            return true
        return false 
    }

    componentDidMount(){
        this.props.navigation.setParams({
            getAdded: () => this.state.added,
            prevStep: this.prevStep,
            nextStep: this.nextStep,
            // added: this.state.added
        })
        let location = this.props.navigation.getParam('location', '')
        let workspace = this.props.navigation.getParam('workspace', '')
        if(location){
            this.selectLocation(location)
        } else {
            this.nextStep('location')
            this.props.fetchLocations()
        }

        AsyncStorage.getItem('token', (err, token) => {
            if(token)
                this.setState({accessToken: token}, () => {
                    // console.log('token found ', token)
                })
        })
    }

    toggleLoading = (loading) => {
        this.setState({
            loading: !this.state.loading
        })
    }

    sortPricings = (pricings) => {
        return pricings.sort(sortPricing)
    }

    changeStep = (step, prevStep, nextStep) => {
        console.log('> changing step', step, prevStep, nextStep)
        if(prevStep == 'success'){
            this.props.navigation.goBack()
            return;
        }
            this.setState({
                step: step,
                loading: false,
                nextStep: nextStep,
                prevStep, prevStep
            }, () => {
                console.log('next step >>>>>', step)
            })
    }

    beforeBooking = () => {
        console.log('In before booking')
        this.setState({loading: true})
        switch (this.state.paymentType) {
            case 'bank':
                // this.changeStep('payment', 'package', 'done')   
                this.nextStep('payment')             
                break;
            case 'yenepay':
                console.log('Yene pay choosen')
                this.book()
                break;
            case 'later':
            default:
                this.book()
                break;
        }
    
    }

    book = () => {
        this.setState({loading: true})
        let workspaceSubscription = {
            pricingId: this.state.pricing.id,
            serviceId: this.state.service.id,
            locationId: this.state.service.locationId,
            type: this.state.deskType,
            startDate: this.state.startDate,
            paymentType: this.state.paymentType
        }

        workspaceSubscription.numberOfDesks = this.state.deskType == 'hot' ? this.state.capacity : this.state.service.capacity
        
        if(this.state.deskType == 'hot')
            workspaceSubscription.passType = this.state.passType
        if(this.state.paymentImage)
            workspaceSubscription.paymentAttached = this.state.paymentImage

        this.props.addWorkspace(workspaceSubscription, response => {
            console.log('> added successfuly')
            this.setState({loading: false, added: true})
            if(this.state.paymentType === 'yenepay'){
                console.log('Payment type yenepay')
                Linking.canOpenURL(response.yenepayUrl).then(supported => {
                    if (supported) {
                      Linking.openURL(response.yenepayUrl);
                    } else {
                      console.log("Don't know how to open URI: " + response.yenepayUrl);
                    }
                })
            }
            this.nextStep('success')
        })
        // if(this.props.workspaceError){
        // this.setState({loading: false})
        // }
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
      }

    getTotal = () => {
        console.log('> in get total')
        let pricings = this.state.service.pricings.filter(pricing => pricing.unit === this.state.unit)
        let pricing = this.state.pricing

        if (this.state.deskType == 'hot') {
            console.log('> pricing ', pricing, this.state.capacity)
            // this.setState({total: 50})
            this.setState({total: pricing ? this.state.passType === 'full' ? pricing.unitPrice * pricing.duration * this.state.capacity : pricing.extra.unitPrice * pricing.duration * this.state.capacity : 0})
        } else {
            // pricings = this.sortPricings(pricings)
            // if(this.state.duration == 1){
            //     console.log('> is one')
            //     pricing = pricings[0].duration == 1 ? pricings[0] : pricings[1]
            //     this.setState({pricing: pricing, total: pricing.duration * pricing.unitPrice * this.state.service.capacity})
            //     return;
            // }
            // current = pricings[0]
            // prevPricing = current
            // pricings.forEach(element => {
            //     prevPricing = current
            //     current = element

            //     if(current.duration >= this.state.duration && prevPricing.duration <= this.state.duration) {
            //         pricing = current
            //     }
            // });
            // console.log('> is not one', pricing)
            pric = pricings.filter(pric => this.state.duration == pric.duration)
            console.log(pric)
            if (pric.length > 0)
                pricing = pric[0]
            console.log("pricing: ",pric, pricing)
            console.log("Duration: ", pricing.duration, pricing.unitPrice, this.state.service.capacity)
            if(pricing.duration == 1){
                this.setState({pricing: pricing, total: pricing.duration * pricing.unitPrice  * this.state.service.capacity}, () => {
                    console.log("total: ", this.state.total)
                })
            } else {
                this.setState({pricing: pricing, total: pricing.duration * pricing.unitPrice * this.state.service.capacity}, () => {
                    console.log("total: ", this.state.total)
                })                
            }
            // console.log('> result', pricings, pricing)
        }
    }

    selectLocation = (location) => {
        console.log('> location selected', location)
        this.setState({
            location: location,
        }, () => {
            this.nextStep('desk', this.props.fetchAvailablePackages, location.id)
            // this.changeStep('desk', 'location', 'package')
        })
        
    }

    selectDesk = (type) => {
        this.setState({
            deskType: type
        }, () => {
            try{
                console.log('> location services', this.props[type][0].pricings[0])
                this.selectService(this.props[type][0].id, () => this.nextStep('package'))
                    // if(this.state.service && this.state.pricing)
                    // else 
                    // Alert.alert(
                    //     'Warning',
                    //     `No available desks, Choose`,
                    //     );
                    // })
            } catch(err){
                Alert.alert(
                    'Warning',
                    `No available desks, Choose another location ...`
                    );
            }
        })
    }

    selectService = (serviceId, cb) => {
        // console.log('>>>>> desk type', this.state.deskType)
        let services = this.props[this.state.deskType].filter(service => {
            // console.log(service._id, serviceId)
            if(service.id === serviceId)
                return true
            return false
        })
        console.log('> services', services)
        
        this.setState({
            service: services.length ? services[0] : {},
            pricing: services.length ? services[0].pricings[0]: {},
            unit: services.length ? services[0].pricings[0].unit : 'day'
        }, () => {
            try {
                this.getTotal()            
            } catch (error) {
                console.log('> error getting total', error)
            }
            console.log('> pricing', this.state.pricing)
            cb()
        })

        // this.loadPackages()
    }

    selectPackage = (package_) => {
        this.setState({
            package_: package_
        }, () => console.log('>>>>> select package', package_))
    }

    changeState = (obj, cb) => {
        console.log('>>>>> received', obj)
        this.setState({...obj}, () => {
            // if(this.state.pricing)
            try {
                this.getTotal()
            } catch (error) {
                
            }
            // this.isActive()
            if(cb) cb()
        })
    }

    reset = () => {
        this.setState({
          pickedImage: null
        });
      }
    
    pickImageHandler = () => {
        this.setState({showImagePicker: true})
      }
    
      resetHandler = () =>{
        this.reset();
      }
    
      uploadImage = (file) => {
        //   this.setState({loading: true})
        
        this.setState({
            paymentImage: file
        }, () => {
            this.book()
        })
      }
      renderSuccess() {
        return (
          <Popup
              visible={this.props.added}
              back={()=>this.props.navigation.navigate('WorkSpaces')}>
              <View style={{
                      width: '80%', paddingTop: 16,
                      alignSelf: 'center', backgroundColor: '#F1F9FF',
                      justifyContent: 'center', alignItems: 'center',
                        borderRadius: 20 }}>
                  <Text style={{
                      color:'#6D6F72', 
                      fontSize:18, textAlign: "center",
                  }}> Workspace subscribed successful </Text>
                  <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
              </View>
          </Popup>
        )
      }

    _renderLoading = () => {
        console.log('in loading', this.props.loading, this.state.loading)
        if (this.props.loading || this.state.loading)
          return (
            <Loading />        
          )
        return null

    }
    _renderStepItem = () => {
        // console.log('locations >>>>', this.props.locations)
        
        switch(this.state.step) {
            case 'location':
                return <WorkspaceLocation 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep} 
                            changeStep={this.changeStep} 
                            locations={this.props.locations}
                            selectLocation={this.selectLocation}
                            accessToken={this.state.accessToken}
                            getImageUrl={this.getImageUrl}
                            />
            case 'desk':
                return <WorkspaceDesk
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            changeStep={this.changeStep}
                            selectDesk={this.selectDesk}
                            hot={this.props.hot}
                            enclosed={this.props.enclosed}
                            dedicated={this.props.dedicated}
                            />
            case 'package':
                return <WorkspacePackage
                            {...this.state}
                            selectService={this.selectService}
                            services={this.props[this.state.deskType]}
                            changeStep={this.changeStep}
                            selectPackage={this.selectPackage}
                            navigation={this.props.navigation}
                            changeState={this.changeState}
                            book={this.beforeBooking}
                            setModalVisible={this.setModalVisible}
                            isActive={this.isActive}
                            toPrevStep={this.prevStep}
                            toNextStep={this.nextStep}
                            />
            case 'summary':
                return <PaymentChoice
                            book={this.beforeBooking}
                            changeState={this.changeState}
                            loading={this.state.loading}
                            />
            case 'payment':
                return <WorkspacePayment 
                            pickedImage={this.state.pickedImage}
                            pickImageHandler={this.pickImageHandler}
                            resetHandler={this.resetHandler}
                            uploadImage={this.uploadImage}
                            />
            case 'success':
                return <SubscriptionSuccess navigation={this.props.navigation}/>
            default:
                return <WorkspaceLocation
                            nextStep="desk"
                            changeStep={this.changeStep}
                            />
        }
    }

    render(){
        
        return (
            <View style={styles.container}>
                {this._renderStepItem()}
                {this._renderLoading()}
                {/* {this.renderSuccess()} */}
                <UploadImage 
                    container="workspaceSubscription"
                    visible={this.state.showImagePicker}
                    back={() => this.setState({showImagePicker: false})}
                    onSuccess={this.uploadImage}
                    onError={() => console.log("Error uploading bank voucher")}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.workspaceReducer,
    workspaceError: state.workspaceReducer.error,
    ...state.locationReducer,
})

const mapDispatchToProps = (dispatch) => ({
    fetchLocations: () => dispatch(fetchLocations()),
    fetchAvailablePackages: branchId => dispatch(fetchAvailable(branchId)),
    uploadImage: (data, onSuccess) => dispatch(uploadImage(data, onSuccess)),
    addWorkspace: (workspace, onSuccess) => dispatch(addWorkspace(workspace, onSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)