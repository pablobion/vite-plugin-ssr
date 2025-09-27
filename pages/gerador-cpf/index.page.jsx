import { DefaultToolPage } from '../../components/layout/default-tool-page'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useState } from 'react'

export { Page }

function Page() {
  const [cpf, setCpf] = useState('')
  const [generatedCpf, setGeneratedCpf] = useState('')

  const generateCPF = () => {
    // Função simples para gerar CPF
    const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))

    // Cálculo do primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += numbers[i] * (10 - i)
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    // Cálculo do segundo dígito verificador
    numbers.push(firstDigit)
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += numbers[i] * (11 - i)
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    numbers.push(secondDigit)

    const cpfString = numbers.join('')
    const formattedCpf = cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    setGeneratedCpf(formattedCpf)
  }

  const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '')

    if (cleanCpf.length !== 11) return false

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false

    // Validação do CPF
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf[i]) * (10 - i)
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    if (parseInt(cleanCpf[9]) !== firstDigit) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf[i]) * (11 - i)
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

    return parseInt(cleanCpf[10]) === secondDigit
  }

  const handleValidate = () => {
    if (validateCPF(cpf)) {
      alert('CPF válido!')
    } else {
      alert('CPF inválido!')
    }
  }

  const feature = (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Gerador de CPF</h2>
        <Button onClick={generateCPF} className="mb-4">
          Gerar CPF Aleatório
        </Button>
        {generatedCpf && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-mono text-lg">{generatedCpf}</p>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold mb-4">Validador de CPF</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Digite o CPF (apenas números)"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleValidate} variant="outline">
            Validar
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <DefaultToolPage
      title="Gerador e Validador de CPF"
      description="Gere CPFs válidos aleatoriamente ou valide CPFs existentes com nossa ferramenta gratuita."
      feature={feature}
      locale="pt"
    >
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sobre CPF</h3>
          <p className="text-muted-foreground">
            O CPF (Cadastro de Pessoas Físicas) é um documento de identificação brasileiro.
            Nossa ferramenta pode gerar CPFs válidos para testes ou validar CPFs existentes.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ Aviso:</strong> Esta ferramenta é apenas para fins educacionais e de teste.
              Não use CPFs gerados para atividades ilegais.
            </p>
          </div>
        </div>
      </CardContent>
    </DefaultToolPage>
  )
}
