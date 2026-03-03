import imgMapBackgroundVectorize from "figma:asset/98255831f7c7b19bcfaeb92a73576de3afe70ccb.png";
import imgVehicleTransparent from "figma:asset/c155dffbdef22194e1cb4df967497527d69aee83.png";
import imgUser from "figma:asset/be0877716b482f24d313da95b8f226f644f183ae.png";
import imgUser1 from "figma:asset/a7e2803783151a46a136f2e43f83e9533f08d08a.png";
import imgUser2 from "figma:asset/3acfeb9fcc40fe6104272a007a6281de35130f6a.png";
import imgUserAvatar from "figma:asset/7079712b4d0c1f7c9e613eac8f7b68034a772776.png";

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#15803d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]"></p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Carpo</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="mr-[-0.002px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Container1 />
        <Margin />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function ButtonCollapseSidebar() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button - Collapse sidebar">
      <Container2 />
    </div>
  );
}

function ButtonCollapseSidebarMargin() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-[16px] mr-[-0.002px] relative" data-name="Button - Collapse sidebar:margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end min-w-[inherit] pl-[95.422px] relative w-full">
          <ButtonCollapseSidebar />
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center left-0 pb-px pl-[24px] pr-[24.002px] right-0 top-0" data-name="Logo">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b border-solid inset-0 pointer-events-none" />
      <Container />
      <ButtonCollapseSidebarMargin />
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[16px]">Dashboard</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function LinkOverview() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="Link - Overview">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin1 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Overview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container4 />
    </div>
  );
}

function LinkSchedule() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Schedule">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin2 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container5 />
    </div>
  );
}

function LinkCustomer() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Customer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin3 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Nav">
      <LinkOverview />
      <LinkSchedule />
      <LinkCustomer />
    </div>
  );
}

function DashboardGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Dashboard Group">
      <Heading1 />
      <Nav />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[16px]">Analytical</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin4 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Transaction</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#15803d] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">12</p>
      </div>
    </div>
  );
}

function LinkTransaction() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Transaction">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[8px] pr-[7.99px] py-[8px] relative w-full">
          <Container6 />
          <Background />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container8 />
    </div>
  );
}

function LinkWallet() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Wallet">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin5 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Nav">
      <LinkTransaction />
      <LinkWallet />
    </div>
  );
}

function AnalyticalGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Analytical Group">
      <Heading2 />
      <Nav1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[16px]">Products</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container9 />
    </div>
  );
}

function LinkShowroom() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Showroom">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin6 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Showroom</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Margin7 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Feedback</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#15803d] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">9</p>
      </div>
    </div>
  );
}

function LinkFeedback() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Feedback">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative w-full">
          <Container10 />
          <Background1 />
        </div>
      </div>
    </div>
  );
}

function Nav2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Nav">
      <LinkShowroom />
      <LinkFeedback />
    </div>
  );
}

function ProductsGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Products Group">
      <Heading3 />
      <Nav2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] tracking-[0.6px] uppercase w-full">
          <p className="leading-[16px]">Security and Privacy</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container12 />
    </div>
  );
}

function LinkHelpCenter() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Help Center">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin8 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Help Center</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[24px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[14px]"></p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0 w-[32px]" data-name="Margin">
      <Container13 />
    </div>
  );
}

function LinkSettings() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link - Settings">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[8px] relative w-full">
          <Margin9 />
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Nav">
      <LinkHelpCenter />
      <LinkSettings />
    </div>
  );
}

function SecurityGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Security Group">
      <Heading4 />
      <Nav3 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] inset-[64px_0_0_0] items-start overflow-auto p-[16px]" data-name="Navigation">
      <DashboardGroup />
      <AnalyticalGroup />
      <ProductsGroup />
      <SecurityGroup />
    </div>
  );
}

function AsideSidebar() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-r border-solid bottom-[174px] left-0 top-0 w-[256px]" data-name="Aside - Sidebar">
      <Logo />
      <Navigation />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
        <p className="leading-[28px]">Map Tracking</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[14px] w-full">
          <p className="leading-[normal]">Search Vehicle, Customer, and other</p>
        </div>
      </div>
    </div>
  );
}

function InputSearchMap() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[8px] shrink-0 w-[320px]" data-name="Input - Search map">
      <div className="content-stretch flex items-start justify-center overflow-clip pb-[11px] pl-[17px] pr-[41px] pt-[10px] relative rounded-[inherit] w-full">
        <Container17 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[12px] top-[10px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <InputSearchMap />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container16 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative w-full">
        <Container15 />
      </div>
    </div>
  );
}

function MapBackgroundVectorize() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px mix-blend-multiply opacity-50 relative w-full" data-name="Map Background !vectorize">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgMapBackgroundVectorize} />
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function ButtonFullscreen() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center p-[8px] right-[16px] rounded-[8px] size-[40px] top-[16px]" data-name="Button - Fullscreen">
      <div className="absolute bg-[rgba(255,255,255,0)] right-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Button - Fullscreen:shadow" />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid','Noto_Sans:Black',sans-serif] justify-center leading-[0] relative shrink-0 text-[#4b5563] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 900" }}>
        <p className="leading-[16px]">+</p>
      </div>
    </div>
  );
}

function ButtonZoomIn() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Button - Zoom in">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Button - Zoom in:shadow" />
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function ButtonZoomOut() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Button - Zoom out">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Button - Zoom out:shadow" />
      <Container22 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[8px] items-start right-[16px]" data-name="Container">
      <ButtonZoomIn />
      <ButtonZoomOut />
    </div>
  );
}

function MapMarkers() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col inset-[21.44%_72.84%_71.44%_22.84%] items-start p-[8px] rounded-[9999px]" data-name="Map Markers">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Map Markers:shadow" />
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col inset-[55.98%_64.51%_36.9%_31.18%] items-start p-[8px] rounded-[9999px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#15803d] content-stretch flex flex-col inset-[55.98%_52.16%_36.9%_43.53%] items-start p-[8px] rounded-[9999px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[136px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Toyota Avanza 1.5 A/T</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] right-[12px] top-[156px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">B1234ABC</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Santoso</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">+62 8976541217</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">12 June 2024</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[12px] pt-[9px] right-[12px] top-[180px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Container24 />
      <Container27 />
      <Container30 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col items-center left-[12px] px-px py-[5px] right-[12px] rounded-[4px] top-[257px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] text-center whitespace-nowrap">
        <p className="leading-[15px]">Time left: 120 hr · 52 min · 12 sec</p>
      </div>
    </div>
  );
}

function VehicleTransparent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Vehicle !transparent">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgVehicleTransparent} />
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-[#22c55e] content-stretch flex flex-col items-start left-[8px] px-[8px] py-[2px] rounded-[4px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white uppercase whitespace-nowrap">
        <p className="leading-[15px]">In use</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[112px] items-start justify-center left-[12px] overflow-clip right-[12px] rounded-[8px] top-[12px]" data-name="Container">
      <VehicleTransparent />
      <Background4 />
    </div>
  );
}

function FloatingCard() {
  return (
    <div className="-translate-x-1/2 absolute bg-white bottom-[17.26%] left-1/2 rounded-[12px] top-[17.26%] w-[256px]" data-name="Floating Card">
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] bottom-0 left-1/2 rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[256px]" data-name="Floating Card:shadow" />
      <Heading5 />
      <Container23 />
      <HorizontalBorder />
      <BackgroundBorder />
      <Container33 />
    </div>
  );
}

function MapVisualPlaceholder() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-[400px] min-w-px relative rounded-[12px] w-full" data-name="Map Visual Placeholder">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center min-h-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <MapBackgroundVectorize />
        <ButtonFullscreen />
        <Container20 />
        <MapMarkers />
        <Background2 />
        <Background3 />
        <FloatingCard />
      </div>
    </div>
  );
}

function MapTrackingLeft() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Map Tracking (Left)">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start p-[25px] relative size-full">
        <Margin10 />
        <MapVisualPlaceholder />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
        <p className="leading-[28px]">Statistic</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Past 7 days</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Container35 />
      <Container36 />
      <Margin11 />
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
          <Heading6 />
          <Background5 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Customer</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">20</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">↗ 12%</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">than last month</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]" data-name="Container">
      <Container39 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container45 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{`See Detail >`}</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <Border />
      <Link />
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Item 1">
      <Container38 />
      <Container44 />
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden="true" className="absolute border-[#dadee2] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Order</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">27</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">↗ 32%</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">than last month</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container51 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[137px]" data-name="Container">
      <Container47 />
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container53 />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{`See Detail >`}</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <Border1 />
      <Link1 />
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Item 2">
      <Container46 />
      <Container52 />
    </div>
  );
}

function Separator1() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden="true" className="absolute border-[#dadee2] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Income</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">$2000</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">↗ 40%</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">than last month</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[137px]" data-name="Container">
      <Container55 />
      <Container56 />
      <Container57 />
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container61 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{`See Detail >`}</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <Border2 />
      <Link2 />
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Item 3">
      <Container54 />
      <Container60 />
    </div>
  );
}

function Separator2() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden="true" className="absolute border-[#dadee2] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Expenses</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">$3400</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">↘ 12%</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">than last month</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[135px]" data-name="Container">
      <Container63 />
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container69 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d1d5db] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{`See Detail >`}</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0" data-name="Container">
      <Border3 />
      <Link3 />
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Item 4">
      <Container62 />
      <Container68 />
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">
        <Item />
        <Separator />
        <Item1 />
        <Separator1 />
        <Item2 />
        <Separator2 />
        <Item3 />
      </div>
    </div>
  );
}

function StatisticsRight() {
  return (
    <div className="bg-white relative rounded-[16px] self-stretch shrink-0 w-[320px]" data-name="Statistics (Right)">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative size-full">
        <Container34 />
        <Container37 />
      </div>
    </div>
  );
}

function TopSectionMapStats() {
  return (
    <div className="content-stretch flex gap-[24px] h-[553px] items-start relative shrink-0 w-full" data-name="Top Section: Map & Stats">
      <MapTrackingLeft />
      <StatisticsRight />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
        <p className="leading-[28px]">Schedule</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Day</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Week</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Month</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex items-start p-[4px] relative rounded-[8px] shrink-0" data-name="Background">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container73() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container73 />
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]"></p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container74 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Background6 />
      <Container72 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container71 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container70 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-full">
          <p className="leading-[normal]">Search</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[8px] pl-[13px] pr-[33px] pt-[7px] relative w-full">
          <Container77 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[10px] top-[8px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Container78 />
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[16px] relative w-full">
        <Container76 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Week 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Week 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col items-center left-[-15px] px-[6px] py-[2px] rounded-[4px] top-[-24px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
        <p className="mb-0">12</p>
        <p>Jun</p>
      </div>
    </div>
  );
}

function CurrentTimeIndicator() {
  return (
    <div className="absolute bottom-[-200px] left-[-16px] top-[-2px] w-px" data-name="Current Time Indicator">
      <div aria-hidden="true" className="absolute border-[#1f2937] border-dashed border-l inset-0 pointer-events-none" />
      <Background7 />
      <div className="absolute bg-black left-[-2.5px] rounded-[9999px] size-[6px] top-[-1.5px]" data-name="Background" />
    </div>
  );
}

function Container82() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Week 3</p>
          </div>
          <CurrentTimeIndicator />
        </div>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[16px]">Week 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
        <Container80 />
        <Container81 />
        <Container82 />
        <Container83 />
      </div>
    </div>
  );
}

function HeaderRowWithSearchWeeks() {
  return (
    <div className="content-stretch flex items-center pb-[9px] relative shrink-0 w-full" data-name="Header Row with Search & Weeks">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container75 />
      <Container79 />
    </div>
  );
}

function HeaderRowWithSearchWeeksMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Header Row with Search & Weeks:margin">
      <HeaderRowWithSearchWeeks />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">
        <p className="leading-[20px]">B 1234 ABC</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-full">
        <p className="leading-[16px]">Toyota Avanza 1.5 A/T</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0 w-[192px]" data-name="Container">
      <Container85 />
      <Container86 />
    </div>
  );
}

function User() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUser} />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <User />
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Santoso</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">01/06 - 12/06</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="relative shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container89 />
        <Container90 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex gap-[8px] inset-[0_55%_0_5%] items-center p-[9px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Background8 />
      <Container88 />
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <BackgroundBorder1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0 w-full" data-name="Row 1">
      <Container84 />
      <Container87 />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">
        <p className="leading-[20px]">B 2456 RBH</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-full">
        <p className="leading-[16px]">Toyota Celoz</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0 w-[192px]" data-name="Container">
      <Container92 />
      <Container93 />
    </div>
  );
}

function User1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUser1} />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <User1 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#14532d] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">William Bahari</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#22c55e] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">01/06 - 04/06</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-[66px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container96 />
        <Container97 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-[#f0fdf4] content-stretch flex gap-[8px] inset-[0_72%_0_0] items-center p-[9px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dcfce7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Background9 />
      <Container95 />
    </div>
  );
}

function User2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="User">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUser2} />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <User2 />
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#14532d] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Samuel Cristoft</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#22c55e] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">07/06 - 10/06</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="relative shrink-0 w-[73px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container99 />
        <Container100 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-[#f0fdf4] content-stretch flex gap-[8px] inset-[0_42%_0_30%] items-center p-[9px] rounded-[8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dcfce7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Background10 />
      <Container98 />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">Hari Utejo Budiman</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">13/06 - 15/06</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="relative shrink-0 w-[91px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container102 />
        <Container103 />
      </div>
    </div>
  );
}

function GrayFutureItem() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex inset-[0_0_0_80%] items-center opacity-60 pl-[17px] pr-[1.06px] py-[9px] rounded-[8px]" data-name="Gray future item">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container101 />
    </div>
  );
}

function Container94() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <GrayFutureItem />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0 w-full" data-name="Row 2">
      <Container91 />
      <Container94 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">
        <p className="leading-[20px]">B 1123 GBH</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-full">
        <p className="leading-[16px]">Daihatsu Xenia</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0 w-[192px]" data-name="Container">
      <Container105 />
      <Container106 />
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">
        <p className="leading-[8px]"></p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#1e3a8a] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container108 />
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e3a8a] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">PT. Budi Utomo</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3b82f6] text-[10px] whitespace-nowrap">
        <p className="leading-[15px]">12/06 - 24/06</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="relative shrink-0 w-[74px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container110 />
        <Container111 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="absolute bg-[#eff6ff] bottom-0 content-stretch flex gap-[8px] items-center left-3/4 p-[9px] right-0 rounded-[8px] top-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#dbeafe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Background11 />
      <Container109 />
    </div>
  );
}

function Container107() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <BackgroundBorder4 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0 w-full" data-name="Row 3">
      <Container104 />
      <Container107 />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">
        <p className="leading-[20px]">B 7654 TTI</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0 w-[192px]" data-name="Container">
      <Container113 />
    </div>
  );
}

function Row4Cutoff() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0 w-full" data-name="Row 4 Cutoff">
      <Container112 />
    </div>
  );
}

function GanttStyleTimeline() {
  return (
    <div className="min-w-[700px] relative shrink-0 w-full" data-name="Gantt-style Timeline">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-w-[inherit] overflow-auto relative w-full">
        <HeaderRowWithSearchWeeksMargin />
        <Row />
        <Row1 />
        <Row2 />
        <Row4Cutoff />
      </div>
    </div>
  );
}

function ScheduleLeft() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Schedule (Left)">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col items-start p-[25px] relative size-full">
        <Margin12 />
        <GanttStyleTimeline />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
        <p className="leading-[28px]">Order</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`View All >`}</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Heading8 />
        <Link4 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[6px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Ongoing</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px py-[6px] relative" data-name="Button">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">Next 5 Days</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center p-[4px] relative w-full">
          <Button5 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-[#15803d] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[15px]">In use</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
          <p className="leading-[28px]">00123</p>
        </div>
        <Background13 />
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[14px] w-full">
        <p className="leading-[20px]">Toyota Avanza 1.5 A/T</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">B1234ABC</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Santoso</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-0 right-[135px] top-[13px]" data-name="Container">
      <Container120 />
      <Container121 />
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">+62 8976541217</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center justify-end left-[135px] right-0 top-[13px]" data-name="Container">
      <Container123 />
      <Container124 />
    </div>
  );
}

function Container126() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">01 June 2024</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-0 right-[135px] top-[37px]" data-name="Container">
      <Container126 />
      <Container127 />
    </div>
  );
}

function Container129() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[16px]" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[12px]"></p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">12 June 2024</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center justify-end left-[135px] right-0 top-[37px]" data-name="Container">
      <Container129 />
      <Container130 />
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Container119 />
      <Container122 />
      <Container125 />
      <Container128 />
    </div>
  );
}

function OrderCard() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative rounded-[12px] shrink-0 w-full" data-name="Order Card 1">
      <Container116 />
      <Container117 />
      <Container118 />
      <HorizontalBorder1 />
    </div>
  );
}

function Separator3() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden="true" className="absolute border-[#dadee2] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Background14() {
  return (
    <div className="bg-[#15803d] content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[15px]">In use</p>
      </div>
    </div>
  );
}

function Container131() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">
          <p className="leading-[28px]">00124</p>
        </div>
        <Background14 />
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[14px] w-full">
        <p className="leading-[20px]">Toyota Avanza 1.5 A/T</p>
      </div>
    </div>
  );
}

function OrderCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[4px] items-start pt-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Order Card 2">
      <Container131 />
      <Container132 />
    </div>
  );
}

function Container115() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <OrderCard />
        <Separator3 />
        <OrderCard1 />
      </div>
    </div>
  );
}

function OrdersRight() {
  return (
    <div className="bg-white relative rounded-[16px] self-stretch shrink-0 w-[320px]" data-name="Orders (Right)">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container114 />
        <Background12 />
        <Container115 />
      </div>
    </div>
  );
}

function BottomSectionScheduleOrder() {
  return (
    <div className="content-stretch flex gap-[24px] h-[393px] items-start relative shrink-0 w-full" data-name="Bottom Section: Schedule & Order">
      <ScheduleLeft />
      <OrdersRight />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 p-[24px] right-0 top-[44px]" data-name="Container">
      <TopSectionMapStats />
      <BottomSectionScheduleOrder />
    </div>
  );
}

function Container134() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Dashboard</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="content-stretch flex flex-col items-start px-[8px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">/</p>
      </div>
    </div>
  );
}

function Container135() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Overview</p>
      </div>
    </div>
  );
}

function Container133() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <Container134 />
        <Margin13 />
        <Container135 />
      </div>
    </div>
  );
}

function Container137() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[28px]"></p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="absolute bg-[#ef4444] right-[-4px] rounded-[9999px] size-[8px] top-[-4px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] right-0 rounded-[9999px] shadow-[0px_0px_0px_2px_white] size-[8px] top-0" data-name="Overlay+Shadow" />
    </div>
  );
}

function ButtonNotifications() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button - Notifications">
      <Container137 />
      <Background15 />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] text-right whitespace-nowrap">
        <p className="leading-[20px]">John Erick</p>
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] text-right whitespace-nowrap">
        <p className="leading-[16px]">Admin</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69px]" data-name="Container">
      <Container140 />
      <Container141 />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[36px]" data-name="User Avatar">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgUserAvatar} />
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function ButtonUserMenu() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button - User menu">
      <Container142 />
    </div>
  );
}

function Container138() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container139 />
      <UserAvatar />
      <ButtonUserMenu />
    </div>
  );
}

function Container136() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative">
        <ButtonNotifications />
        <Container138 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex h-[61px] items-center justify-between pb-px pointer-events-auto px-[24px] sticky top-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container133 />
      <Container136 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute bg-[#f9fafb] inset-[11px_0_32px_256px]" data-name="Main Content">
      <Container14 />
      <div className="absolute h-[1031px] inset-0 pointer-events-none">
        <Header />
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <AsideSidebar />
      <MainContent />
    </div>
  );
}