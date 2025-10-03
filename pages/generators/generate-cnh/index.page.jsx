import { useTranslationStatic } from '../../../lib/hooks/useTranslation'
import { navigate } from 'vite-plugin-ssr/client/router'
import { DefaultToolPage } from '../../../components/layout/default-tool-page'
import { Card, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Switch } from '../../../components/ui/switch'
import { useState } from 'react'
import { IdCard, Settings, RefreshCw, Copy, Trash2, CheckCircle } from 'lucide-react'
import { Combobox } from '../../../components/ui/combobox'
// Import estático das traduções
import ptTranslations from './translations/pt.json'
import enTranslations from './translations/en.json'
import esTranslations from './translations/es.json'

export { Page }

// Meta tags personalizadas para SEO
export const documentProps = (pageContext) => {
  const { locale } = pageContext

  const metaData = {
    pt: {
      title: 'Gerador de CNH Gratuito - Carteira Nacional de Habilitação | 4Generate',
      description: 'Gere números de CNH válidos instantaneamente com nosso gerador online. Suporte completo a todos os 27 estados brasileiros e 15 categorias de habilitação. Ferramenta gratuita para desenvolvedores, testes e fins educacionais.',
      keywords: 'algoritmo cnh, detran, teste cnh, validador cnh, cnh fake, desenvolvimento, documento oficial, validação matemática'
    },
    en: {
      title: 'Free CNH Generator - Brazilian Driver License | 4Generate',
      description: 'Generate valid CNH numbers instantly with our online generator. Complete support for all 27 Brazilian states and 15 license categories. Free tool for developers, testing and educational purposes.',
      keywords: 'cnh algorithm, detran, test cnh, cnh validator, fake cnh, development, official document, mathematical validation'
    },
    es: {
      title: 'Generador de CNH Gratuito - Licencia de Conducir Brasileña | 4Generate',
      description: 'Genera números de CNH válidos instantáneamente con nuestro generador online. Soporte completo para los 27 estados brasileños y 15 categorías de licencia. Herramienta gratuita para desarrolladores, pruebas y fines educativos.',
      keywords: 'algoritmo cnh, detran, prueba cnh, validador cnh, cnh falsa, desarrollo, documento oficial, validación matemática'
    }
  }

  return metaData[locale] || metaData.pt
}

// Objeto com todas as traduções
const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
}


// Lista de estados brasileiros
const states = [
  { value: 'AC', name: 'Acre', code: '01' },
  { value: 'AL', name: 'Alagoas', code: '02' },
  { value: 'AP', name: 'Amapá', code: '03' },
  { value: 'AM', name: 'Amazonas', code: '04' },
  { value: 'BA', name: 'Bahia', code: '05' },
  { value: 'CE', name: 'Ceará', code: '06' },
  { value: 'DF', name: 'Distrito Federal', code: '07' },
  { value: 'ES', name: 'Espírito Santo', code: '08' },
  { value: 'GO', name: 'Goiás', code: '09' },
  { value: 'MA', name: 'Maranhão', code: '10' },
  { value: 'MT', name: 'Mato Grosso', code: '11' },
  { value: 'MS', name: 'Mato Grosso do Sul', code: '12' },
  { value: 'MG', name: 'Minas Gerais', code: '13' },
  { value: 'PA', name: 'Pará', code: '14' },
  { value: 'PB', name: 'Paraíba', code: '15' },
  { value: 'PR', name: 'Paraná', code: '16' },
  { value: 'PE', name: 'Pernambuco', code: '17' },
  { value: 'PI', name: 'Piauí', code: '18' },
  { value: 'RJ', name: 'Rio de Janeiro', code: '19' },
  { value: 'RN', name: 'Rio Grande do Norte', code: '20' },
  { value: 'RS', name: 'Rio Grande do Sul', code: '21' },
  { value: 'RO', name: 'Rondônia', code: '22' },
  { value: 'RR', name: 'Roraima', code: '23' },
  { value: 'SC', name: 'Santa Catarina', code: '24' },
  { value: 'SP', name: 'São Paulo', code: '25' },
  { value: 'SE', name: 'Sergipe', code: '26' },
  { value: 'TO', name: 'Tocantins', code: '27' }
]

// Categorias de habilitação
const categories = [
  { value: 'A', name: 'A - Motocicleta', description: 'Motocicletas, ciclomotores e similares' },
  { value: 'B', name: 'B - Automóvel', description: 'Veículos de passeio e comerciais leves' },
  { value: 'C', name: 'C - Caminhão', description: 'Veículos de carga com peso bruto total superior a 3.500kg' },
  { value: 'D', name: 'D - Ônibus', description: 'Veículos de transporte de passageiros com mais de 8 lugares' },
  { value: 'E', name: 'E - Reboque', description: 'Veículos de carga com reboque ou semireboque' },
  { value: 'AB', name: 'AB - Moto + Carro', description: 'Motocicletas e veículos de passeio' },
  { value: 'AC', name: 'AC - Moto + Caminhão', description: 'Motocicletas e caminhões' },
  { value: 'AD', name: 'AD - Moto + Ônibus', description: 'Motocicletas e ônibus' },
  { value: 'AE', name: 'AE - Moto + Reboque', description: 'Motocicletas e veículos com reboque' },
  { value: 'BC', name: 'BC - Carro + Caminhão', description: 'Veículos de passeio e caminhões' },
  { value: 'BD', name: 'BD - Carro + Ônibus', description: 'Veículos de passeio e ônibus' },
  { value: 'BE', name: 'BE - Carro + Reboque', description: 'Veículos de passeio e reboque' },
  { value: 'CD', name: 'CD - Caminhão + Ônibus', description: 'Caminhões e ônibus' },
  { value: 'CE', name: 'CE - Caminhão + Reboque', description: 'Caminhões e reboque' },
  { value: 'DE', name: 'DE - Ônibus + Reboque', description: 'Ônibus e reboque' }
]

function Page() {
  const { t, locale: currentLocale } = useTranslationStatic(translations)
  const [selectedState, setSelectedState] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [generatedCNH, setGeneratedCNH] = useState('')
  const [autoCopy, setAutoCopy] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Função para calcular o dígito verificador da CNH
  const calculateCNHCheckDigit = (cnh) => {
    let sum = 0
    let multiplier = 9

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cnh[i]) * multiplier
      multiplier--
    }

    const remainder = sum % 11
    const firstDigit = remainder < 2 ? 0 : 11 - remainder

    // Segundo dígito verificador
    sum = 0
    multiplier = 1

    for (let i = 0; i < 9; i++) {
      sum += parseInt(cnh[i]) * multiplier
      multiplier++
    }

    const remainder2 = sum % 11
    const secondDigit = remainder2 < 2 ? 0 : 11 - remainder2

    return firstDigit.toString() + secondDigit.toString()
  }

  // Função para gerar CNH válida
  const generateCNH = () => {
    if (!selectedState) {
      alert(t('alerts.stateRequired'))
      return
    }

    if (!selectedCategory) {
      alert(t('alerts.categoryRequired'))
      return
    }

    // Gera os primeiros 9 dígitos aleatoriamente
    let cnh = ''
    for (let i = 0; i < 9; i++) {
      cnh += Math.floor(Math.random() * 10).toString()
    }

    // Calcula os dígitos verificadores
    const checkDigits = calculateCNHCheckDigit(cnh)
    cnh += checkDigits

    // Adiciona o código do estado (2 dígitos)
    const state = states.find(s => s.value === selectedState)
    cnh += state.code

    setGeneratedCNH(cnh)

    // Auto copy se habilitado
    if (autoCopy) {
      copyToClipboard()
    }
  }

  const clearForm = () => {
    setSelectedState('')
    setSelectedCategory('')
    setGeneratedCNH('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCNH)
      alert(t('alerts.copied'))
    } catch (err) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea')
      textArea.value = generatedCNH
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert(t('alerts.copied'))
    }
  }

  const formatCNH = (cnh) => {
    if (!cnh) return ''
    return cnh.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1.$2.$3-$4.$5')
  }

  const feature = (
    <div className="space-y-6 w-full">
      {/* Seleção de Estado */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IdCard className="h-4 w-4 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">{t('form.stateLabel')}</h3>
        </div>

        <div>
          <Combobox
            options={states.map(state => ({
              value: state.value,
              label: state.name,
              code: state.code
            }))}
            value={selectedState}
            onValueChange={setSelectedState}
            placeholder={t('form.statePlaceholder')}
            searchPlaceholder="Buscar estado..."
            renderOption={(option) => (
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{option.value}</span>
                <span className="text-sm text-muted-foreground">{option.label}</span>
              </div>
            )}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {t('form.stateHelp')}
        </p>
      </div>

      {/* Seleção de Categoria */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IdCard className="h-4 w-4 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">{t('form.categoryLabel')}</h3>
        </div>

        <div>
          <Combobox
            options={categories.map(category => ({
              value: category.value,
              label: category.name,
              description: category.description
            }))}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            placeholder={t('form.categoryPlaceholder')}
            searchPlaceholder="Buscar categoria..."
            renderOption={(option) => (
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            )}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {t('form.categoryHelp')}
        </p>
      </div>

      {/* Opções */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Opções</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
            <span className="text-sm font-medium text-foreground">Copiar Automaticamente</span>
            <Switch
              checked={autoCopy}
              onCheckedChange={setAutoCopy}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
            <span className="text-sm font-medium text-foreground">Mostrar Detalhes</span>
            <Switch
              checked={showDetails}
              onCheckedChange={setShowDetails}
            />
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={generateCNH}
          variant="primary"
          size="xl"
          className="w-full"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('buttons.generate')}
        </Button>

        <Button
          onClick={clearForm}
          variant="outline"
          size="xl"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t('buttons.clear')}
        </Button>
      </div>

      {/* Resultado */}
      {generatedCNH && (
        <div className="mt-6 p-4 bg-muted rounded-lg border">
          <h4 className="text-lg font-semibold mb-3 text-foreground">{t('result.title')}</h4>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded border font-mono text-sm break-all">
              {formatCNH(generatedCNH)}
            </div>

            {showDetails && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-2 bg-background rounded border">
                  <span className="font-medium text-foreground">{t('result.number')}:</span>
                  <div className="font-mono text-xs mt-1">{generatedCNH}</div>
                </div>
                <div className="p-2 bg-background rounded border">
                  <span className="font-medium text-foreground">{t('result.state')}:</span>
                  <div className="text-xs mt-1">{states.find(s => s.value === selectedState)?.name}</div>
                </div>
                <div className="p-2 bg-background rounded border">
                  <span className="font-medium text-foreground">{t('result.category')}:</span>
                  <div className="text-xs mt-1">{categories.find(c => c.value === selectedCategory)?.name}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{t('result.valid')}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1 min-h-[48px]">
                <Copy className="mr-2 h-4 w-4" />
                {t('buttons.copy')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const children = (
    <CardContent>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">{t('about.title')}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2 text-foreground">{t('features.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.validAlgorithm')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.stateSelection')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.categorySupport')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.copyEasy')}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">{t('tips.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t('tips.stateRequired')}</li>
              <li>• {t('tips.categoryRequired')}</li>
              <li>• {t('tips.validNumbers')}</li>
              <li>• {t('tips.testOnly')}</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>⚠️ {t('note.title')}:</strong> {t('note.content')}
          </p>
        </div>
      </div>
    </CardContent>
  )

  return (
    <DefaultToolPage
      title={t('title')}
      description={t('description')}
      feature={feature}
      children={children}
      locale={currentLocale}
    />
  )
}
