import { useTranslationStatic } from '../../../lib/hooks/useTranslation'
import { navigate } from 'vite-plugin-ssr/client/router'
import { DefaultToolPage } from '../../../components/layout/default-tool-page'
import { Card, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Switch } from '../../../components/ui/switch'
import { useState } from 'react'
import { Phone, MessageCircle, Settings, RefreshCw, Copy, Trash2 } from 'lucide-react'
import { Combobox } from '../../../components/ui/combobox'
// Import estático das traduções
import ptTranslations from './translations/pt.json'
import enTranslations from './translations/en.json'
import esTranslations from './translations/es.json'

export { Page }

// Objeto com todas as traduções
const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
}

// Lista de países com códigos
const countries = [
  { value: 'br', code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { value: 'us', code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { value: 'ar', code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { value: 'cl', code: '+56', name: 'Chile', flag: '🇨🇱' },
  { value: 'co', code: '+57', name: 'Colômbia', flag: '🇨🇴' },
  { value: 'mx', code: '+52', name: 'México', flag: '🇲🇽' },
  { value: 'pe', code: '+51', name: 'Peru', flag: '🇵🇪' },
  { value: 'uy', code: '+598', name: 'Uruguai', flag: '🇺🇾' },
  { value: 'py', code: '+595', name: 'Paraguai', flag: '🇵🇾' },
  { value: 'bo', code: '+591', name: 'Bolívia', flag: '🇧🇴' },
  { value: 'ec', code: '+593', name: 'Equador', flag: '🇪🇨' },
  { value: 've', code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { value: 'pt', code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { value: 'es', code: '+34', name: 'Espanha', flag: '🇪🇸' },
  { value: 'fr', code: '+33', name: 'França', flag: '🇫🇷' },
  { value: 'de', code: '+49', name: 'Alemanha', flag: '🇩🇪' },
  { value: 'it', code: '+39', name: 'Itália', flag: '🇮🇹' },
  { value: 'gb', code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
  { value: 'ca', code: '+1', name: 'Canadá', flag: '🇨🇦' },
  { value: 'au', code: '+61', name: 'Austrália', flag: '🇦🇺' },
]

function Page() {
  const { t, locale: currentLocale } = useTranslationStatic(translations)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [autoCopy, setAutoCopy] = useState(false)
  const [openNewTab, setOpenNewTab] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0].value)

  const generateWhatsAppLink = () => {
    if (!phoneNumber.trim()) {
      alert(t('alerts.phoneRequired'))
      return
    }

    // Remove caracteres não numéricos e formata o número
    const cleanNumber = phoneNumber.replace(/\D/g, '')

    // Remove código do país do número se já tiver
    const country = countries.find(c => c.value === selectedCountry)
    const countryCode = country.code.replace('+', '')
    const formattedNumber = cleanNumber.startsWith(countryCode)
      ? cleanNumber
      : `${countryCode}${cleanNumber}`

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message.trim())

    // Gera o link do WhatsApp
    const whatsappLink = `https://wa.me/${formattedNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`

    setGeneratedLink(whatsappLink)

    // Auto copy se habilitado
    if (autoCopy) {
      copyToClipboard()
    }

    // Abrir em nova aba se habilitado
    if (openNewTab) {
      window.open(whatsappLink, '_blank')
    }
  }

  const clearForm = () => {
    setPhoneNumber('')
    setMessage('')
    setGeneratedLink('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      alert(t('alerts.copied'))
    } catch (err) {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea')
      textArea.value = generatedLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert(t('alerts.copied'))
    }
  }

  const openWhatsApp = () => {
    window.open(generatedLink, '_blank')
  }

  const feature = (
    <div className="space-y-6 w-full">
      {/* Número de Telefone */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Número de Telefone</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-foreground mb-2">Código do País</label>
            <Combobox
              options={countries.map(country => ({
                value: country.value,
                label: country.name,
                flag: country.flag,
                code: country.code
              }))}
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              placeholder="Selecione um país..."
              searchPlaceholder="Buscar país..."
              renderOption={(option) => (
                <div className="flex items-center gap-2">
                  {option.flag && <span className="text-lg">{option.flag}</span>}
                  {option.code && <span className="font-medium">{option.code}</span>}
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {option.label}
                  </span>
                </div>
              )}
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-medium text-foreground mb-2">Número</label>
            <Input
              type="tel"
              placeholder="Ex: 11999999999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Digite apenas o número sem código do país (ex: 11999999999)
        </p>
      </div>

      {/* Mensagem Opcional */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Mensagem (Opcional)</h3>
        </div>

        <div>
          <Textarea
            placeholder="Digite sua mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          A mensagem aparecerá pré-preenchida no WhatsApp
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
            <span className="text-sm font-medium text-foreground">Abrir em Nova Aba</span>
            <Switch
              checked={openNewTab}
              onCheckedChange={setOpenNewTab}
            />
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={generateWhatsAppLink}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white min-h-[48px]"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Gerar Link
        </Button>

        <Button
          onClick={clearForm}
          variant="outline"
          className="sm:px-8 min-h-[48px]"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar
        </Button>
      </div>

      {/* Resultado */}
      {generatedLink && (
        <div className="mt-6 p-4 bg-muted rounded-lg border">
          <h4 className="text-lg font-semibold mb-3 text-foreground">Link Gerado</h4>
          <div className="space-y-3">
            <div className="p-3 bg-background rounded border font-mono text-sm break-all">
              {generatedLink}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1 min-h-[48px]">
                <Copy className="mr-2 h-4 w-4" />
                Copiar Link
              </Button>
              <Button onClick={openWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 min-h-[48px]">
                <MessageCircle className="mr-2 h-4 w-4" />
                Abrir WhatsApp
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
                {t('features.phoneFormat')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.messageSupport')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.copyLink')}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {t('features.openDirect')}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">{t('tips.title')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t('tips.phoneFormat')}</li>
              <li>• {t('tips.messageOptional')}</li>
              <li>• {t('tips.countryCode')}</li>
              <li>• {t('tips.worksMobile')}</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 {t('note.title')}:</strong> {t('note.content')}
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
