# 📸 Galeria de Fotos Premium

Uma aplicação móvel **ultra premium** para galeria de fotos, desenvolvida com React Native e Expo, apresentando design minimalista e funcionalidades avançadas.

## ✨ Características

### 🎨 **Design Ultra Premium**
- **Interface minimalista** com cores sólidas e elegantes
- **Preto fosco** para elementos principais
- **Verde esmeralda** para destaque de informações
- **Animações suaves** e responsivas
- **Layout em grid** adaptativo

### 🚀 **Funcionalidades Avançadas**
- 📱 **Seleção de fotos** da biblioteca do dispositivo
- 🖼️ **Preview elegante** antes de salvar
- 🗂️ **Organização em grid** responsivo
- 👁️ **Visualização em modal** fullscreen
- 🗑️ **Deleção intuitiva** com confirmação
- 💾 **Armazenamento local** persistente
- 📊 **Informações de arquivo** (tamanho, formato)

### 🛠️ **Tecnologias Utilizadas**
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **AsyncStorage** - Persistência de dados
- **Expo Image Picker** - Seleção de imagens
- **Expo Blur** - Efeitos visuais
- **Animated API** - Animações nativas

## 🚀 Como Usar

### 📋 Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel ou emulador

### ⚙️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/GabrielAlmeida51/Galeria-de-fotos.git
cd Galeria-de-fotos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o projeto**
```bash
npx expo start
```

4. **Escaneie o QR Code** com o app Expo Go no seu dispositivo

### 📱 Funcionalidades

#### **Adicionar Fotos**
- Toque no botão flutuante "+"
- Selecione uma foto da biblioteca
- Visualize o preview
- Salve na galeria

#### **Gerenciar Galeria**
- Visualize todas as fotos em grid
- Toque em uma foto para visualização completa
- Use o botão de deletar para remover fotos
- Contador de fotos no header

#### **Interface Premium**
- Header elegante com estatísticas
- Cards com sombras e elevação
- Botões com feedback visual
- Estados vazios elegantes

## 🎨 Paleta de Cores

### **Cores Principais**
- **Preto Fosco**: `#1a1a1a` - Elementos principais
- **Verde Esmeralda**: `#10b981` - Destaque e ações
- **Background**: `#f8fafc` - Fundo elegante
- **Branco**: `#ffffff` - Textos e cards

### **Cores de Ação**
- **Sucesso**: Verde esmeralda
- **Cancelar**: Preto fosco
- **Deletar**: Vermelho com transparência
- **Informação**: Verde esmeralda

## 📁 Estrutura do Projeto

```
galeria_fotos/
├── app/
│   ├── _layout.tsx          # Layout principal
│   ├── index.tsx            # Tela principal da galeria
│   └── SaveButton.tsx       # Componente de botão salvar
├── components/
│   ├── AddButton.tsx        # Botão de adicionar
│   ├── DeleteButton.tsx     # Botão de deletar
│   └── SaveButton.tsx       # Botão de salvar
├── assets/                  # Recursos estáticos
├── package.json             # Dependências
└── README.md               # Este arquivo
```

## 🔧 Configuração

### **Variáveis de Ambiente**
O projeto não requer variáveis de ambiente especiais, mas você pode configurar:

- **STORAGE_NAME**: Nome da chave de armazenamento (padrão: 'galeria')

### **Permissões**
- **Biblioteca de fotos**: Para seleção de imagens
- **Armazenamento**: Para salvar fotos localmente

## 📱 Compatibilidade

- **iOS**: 13.0+
- **Android**: 6.0+ (API 23+)
- **Expo**: SDK 49+

## 🚀 Deploy

### **Expo Build**
```bash
npx expo build:android
npx expo build:ios
```

### **EAS Build (Recomendado)**
```bash
npm install -g @expo/eas-cli
eas build:configure
eas build
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gabriel Almeida**
- GitHub: [@GabrielAlmeida51](https://github.com/GabrielAlmeida51)
- Projeto: [Galeria de Fotos](https://github.com/GabrielAlmeida51/Galeria-de-fotos)

## 🙏 Agradecimentos

- **Expo Team** pela plataforma incrível
- **React Native Community** pelo framework
- **Designers** que inspiraram o design premium

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

- Abra uma [Issue](https://github.com/GabrielAlmeida51/Galeria-de-fotos/issues)
- Entre em contato via GitHub
- Faça um fork e contribua!

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no GitHub!** ⭐

**Galeria de Fotos Premium** - Transformando memórias em arte digital ✨📸
