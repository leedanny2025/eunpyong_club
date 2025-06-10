"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, BotIcon as Robot, Guitar, PersonStanding, Edit3, Save, X } from "lucide-react"

interface Club {
  id: string
  title: string
  description: string
  memberCount: number
  image: string
  icon: "robot" | "guitar" | "running"
  iconColor: string
}

interface SiteContent {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  sectionTitle: string
  clubs: Club[]
}

const initialContent: SiteContent = {
  heroTitle: "은평구",
  heroSubtitle: "동아리 모임",
  heroDescription: "다양한 관심사를 가진 사람들과 함께하는 특별한 시간을 만들어보세요",
  sectionTitle: "활동 중인 동아리",
  clubs: [
    {
      id: "1",
      title: "GPT 동아리",
      description: "AI와 미래 기술에 대해 함께 배우고 토론하는 모임입니다.",
      memberCount: 15,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      icon: "robot",
      iconColor: "#5947e7",
    },
    {
      id: "2",
      title: "기타 연주 동아리",
      description: "함께 연주하고 음악의 즐거움을 나누는 기타 동아리입니다.",
      memberCount: 12,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      icon: "guitar",
      iconColor: "#18c964",
    },
    {
      id: "3",
      title: "조깅 동아리",
      description: "건강한 삶을 위해 함께 뛰는 러닝 메이트들의 모임입니다.",
      memberCount: 20,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      icon: "running",
      iconColor: "#fa8231",
    },
  ],
}

export default function HomePage() {
  const [content, setContent] = useState<SiteContent>(initialContent)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempContent, setTempContent] = useState<SiteContent>(initialContent)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
        setIsAdminMode(!isAdminMode)
        setEditingField(null)
        setTempContent(content)
      }
      if (e.key === "Escape") {
        setIsAdminMode(false)
        setEditingField(null)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isAdminMode, content])

  const startEditing = (field: string) => {
    setEditingField(field)
  }

  const saveField = (field: string) => {
    setContent(tempContent)
    setEditingField(null)
  }

  const cancelEdit = () => {
    setTempContent(content)
    setEditingField(null)
  }

  const updateTempContent = (field: string, value: any) => {
    if (field.startsWith("club-")) {
      const [, clubId, property] = field.split("-")
      setTempContent((prev) => ({
        ...prev,
        clubs: prev.clubs.map((club) =>
          club.id === clubId
            ? { ...club, [property]: property === "memberCount" ? Number.parseInt(value) || 0 : value }
            : club,
        ),
      }))
    } else {
      setTempContent((prev) => ({ ...prev, [field]: value }))
    }
  }

  const getIcon = (iconType: string, color: string) => {
    const iconProps = { size: 20, style: { color } }
    switch (iconType) {
      case "robot":
        return <Robot {...iconProps} />
      case "guitar":
        return <Guitar {...iconProps} />
      case "running":
        return <PersonStanding {...iconProps} />
      default:
        return <Users {...iconProps} />
    }
  }

  const EditableText = ({
    field,
    value,
    className = "",
    multiline = false,
    placeholder = "",
  }: {
    field: string
    value: string
    className?: string
    multiline?: boolean
    placeholder?: string
  }) => {
    const isEditing = editingField === field

    if (!isAdminMode) {
      return <span className={className}>{value}</span>
    }

    if (isEditing) {
      return (
        <div className="relative inline-block w-full">
          {multiline ? (
            <Textarea
              value={(tempContent[field as keyof SiteContent] as string) || value}
              onChange={(e) => updateTempContent(field, e.target.value)}
              className={`${className} min-h-[60px]`}
              placeholder={placeholder}
              autoFocus
            />
          ) : (
            <Input
              value={(tempContent[field as keyof SiteContent] as string) || value}
              onChange={(e) => updateTempContent(field, e.target.value)}
              className={className}
              placeholder={placeholder}
              autoFocus
            />
          )}
          <div className="flex gap-1 mt-1">
            <Button size="sm" onClick={() => saveField(field)} className="h-6 px-2">
              <Save size={12} />
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit} className="h-6 px-2">
              <X size={12} />
            </Button>
          </div>
        </div>
      )
    }

    return (
      <span
        className={`${className} ${isAdminMode ? "cursor-pointer hover:bg-yellow-100 hover:outline hover:outline-2 hover:outline-yellow-400 rounded px-1" : ""}`}
        onClick={() => isAdminMode && startEditing(field)}
      >
        {value}
        {isAdminMode && <Edit3 size={12} className="inline ml-1 opacity-50" />}
      </span>
    )
  }

  const EditableClubField = ({
    clubId,
    field,
    value,
    className = "",
    type = "text",
  }: {
    clubId: string
    field: string
    value: string | number
    className?: string
    type?: string
  }) => {
    const fieldKey = `club-${clubId}-${field}`
    const isEditing = editingField === fieldKey

    if (!isAdminMode) {
      return <span className={className}>{value}</span>
    }

    if (isEditing) {
      return (
        <div className="relative">
          <Input
            type={type}
            value={tempContent.clubs.find((c) => c.id === clubId)?.[field as keyof Club] || value}
            onChange={(e) => updateTempContent(fieldKey, e.target.value)}
            className={className}
            autoFocus
          />
          <div className="flex gap-1 mt-1">
            <Button size="sm" onClick={() => saveField(fieldKey)} className="h-6 px-2">
              <Save size={12} />
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit} className="h-6 px-2">
              <X size={12} />
            </Button>
          </div>
        </div>
      )
    }

    return (
      <span
        className={`${className} ${isAdminMode ? "cursor-pointer hover:bg-yellow-100 hover:outline hover:outline-2 hover:outline-yellow-400 rounded px-1" : ""}`}
        onClick={() => isAdminMode && startEditing(fieldKey)}
      >
        {value}
        {isAdminMode && <Edit3 size={12} className="inline ml-1 opacity-50" />}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7fafd] font-['Noto_Sans_KR']">
      {/* Admin Mode Indicator */}
      {isAdminMode && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          관리자 모드 (ESC로 종료)
        </div>
      )}

      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 bg-white shadow-sm min-h-16 sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-[#5947e7]">
          <Users size={24} />
          은평구 동아리
        </div>
        <ul className="flex gap-7 list-none m-0 p-0">
          <li>
            <a href="#" className="text-[#333] font-semibold text-[1.04rem] hover:text-[#5947e7] transition-colors">
              홈
            </a>
          </li>
          <li>
            <a href="#" className="text-[#333] font-semibold text-[1.04rem] hover:text-[#5947e7] transition-colors">
              동아리
            </a>
          </li>
          <li>
            <a href="#" className="text-[#333] font-semibold text-[1.04rem] hover:text-[#5947e7] transition-colors">
              세미나
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="py-14 text-center bg-gradient-to-b from-[#e9f1ff] to-[#f7fafd]">
        <h1 className="text-[2.7rem] font-bold mb-3 leading-[1.17] text-[#212121] tracking-[-2px]">
          <EditableText field="heroTitle" value={content.heroTitle} />{" "}
          <span className="text-[#5947e7]">
            <EditableText field="heroSubtitle" value={content.heroSubtitle} />
          </span>
        </h1>
        <p className="text-[1.13rem] text-[#434343] mb-9 tracking-[-1px]">
          <EditableText
            field="heroDescription"
            value={content.heroDescription}
            multiline
            placeholder="히어로 섹션 설명을 입력하세요"
          />
        </p>
        <Button className="bg-[#5947e7] hover:bg-[#4333aa] text-white font-bold text-[1.09rem] px-9 py-3 rounded-[9px] shadow-lg">
          동아리 둘러보기
        </Button>
      </section>

      {/* Section Title */}
      <h2 className="text-center text-[1.35rem] font-bold mt-11 mb-7 tracking-[-1px] text-[#232323]">
        <EditableText field="sectionTitle" value={content.sectionTitle} />
      </h2>

      {/* Clubs Section */}
      <section className="flex flex-wrap justify-center gap-7 mb-15 px-4">
        {content.clubs.map((club) => (
          <Card
            key={club.id}
            className="bg-white rounded-[18px] w-[305px] shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-[1.035] transition-all duration-150 overflow-hidden"
          >
            <img src={club.image || "/placeholder.svg"} alt={club.title} className="w-full h-[162px] object-cover" />
            <div className="p-6 flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2 text-[1.16rem] font-bold mb-1">
                {getIcon(club.icon, club.iconColor)}
                <EditableClubField clubId={club.id} field="title" value={club.title} />
              </div>
              <p className="text-[1.02rem] text-[#3d3d3d] mb-4 flex-1">
                <EditableClubField clubId={club.id} field="description" value={club.description} />
              </p>
              <div className="flex items-center gap-2 text-[0.95rem] text-[#888] font-medium">
                <Users size={16} />
                <EditableClubField clubId={club.id} field="memberCount" value={club.memberCount} type="number" />명 활동
                중
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Instructions */}
      <div className="text-center py-8 text-sm text-gray-500">관리자 모드: "/" 키를 눌러 편집 모드를 활성화하세요</div>
    </div>
  )
}
