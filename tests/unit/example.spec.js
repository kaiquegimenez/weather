import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  const weathers = [
    {
      main: {
        feels_like: 12.48,
        humidity: 67,
        pressure: 1008,
        temp: 13.34,
        temp_max: 13.34,
        temp_min: 13.34
      },
      name: 'Nuuk, GL',
      time: '2022-07-24T18:13:23.720Z',
      color: 'blue'
    },
    {
      main: {
        feels_like: 12.48,
        humidity: 67,
        pressure: 1008,
        temp: 13.34,
        temp_max: 13.34,
        temp_min: 13.34
      },
      name: 'Urubici, BR',
      time: '',
      color: 'red'
    },
    {
      main: 'error',
      name: 'Nairobi, KE',
    },
    {
      main: '',
      name: 'Nairobi, KE',
    }
  ]

  it('Verifica se está mostrando a cor correta', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[0] }
    })
    expect(wrapper.find('.card-body--blue').exists()).toBe(true)
  })
  
  it('Verifica se está renderizando a mensagem de erro', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[2] }
    })
    expect(wrapper.find('.card-error').exists()).toBe(true)
  })

  it('Verifica se não está renderizando a mensagem de erro', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[0] }
    })
    expect(wrapper.find('.card-error').exists()).toBe(false)
  })

  it('Verifica se está renderizando o loader', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[3] }
    })
    expect(wrapper.find('.loader').exists()).toBe(true)
  })

  it('Verifica se não está renderizando o loader', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('.loader').exists()).toBe(false)
  })

  it('Verifica se está renderizando o footer quando a cidade é Urubici, BR', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('.footer-container').exists()).toBe(true)
  })

  it('Verifica se não está renderizando o footer quando a cidade é diferente de Urubici, BR', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[0] }
    })
    expect(wrapper.find('.footer-container').exists()).toBe(false)
  })

  it('Verifica se a parte que informa os dados do clima da cidade só é renderizado quando recebe as informações.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('.footer-container').exists()).toBe(true)
  })

  it('Verifica se a parte que informa os dados do clima da cidade não é renderizado enquanto não recebe as informações o clima.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[3] }
    })
    expect(wrapper.find('.footer-container').exists()).toBe(false)
  })

  it('Verifica se está informando a temperatura corretamente.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('.card-body').text()).toEqual('13°')
  })

  it('Verifica se está informando a pressão corretamente.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('#pressure').text()).toEqual('1008hPa')
  })

  it('Verifica se está informando a umidade corretamente.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    expect(wrapper.find('#humidity').text()).toEqual('67%')
  })

  it('Testar se função de salvar em cache as informações retornadas da API está salvando corretamente.', () => {
    const wrapper = shallowMount(Card, {
      propsData: { weather: weathers[1] }
    })
    wrapper.vm.saveInCache()
    expect(JSON.stringify(weathers[1])).toBe(window.localStorage.getItem('weathers/Urubici, BR'))
  })
})
