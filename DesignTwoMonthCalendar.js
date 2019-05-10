//==============================================================================
//	Composite Component 개발 중에 보여질 Design과 관련된 소스를 작성합니다.
//==============================================================================
//==============================================================================
// Object : nexacro.TwoMonthCalendar_V2
// Group : Component
//==============================================================================
if (nexacro.TwoMonthCalendar_V2)
{
	//==============================================================================
	// nexacro.TwoMonthCalendar_V2
	//==============================================================================
    var _pTwoMonthCalendar_V2 = nexacro.TwoMonthCalendar_V2.prototype;
 
    delete _pTwoMonthCalendar_V2;	
	
	_pTwoMonthCalendar.createCssDesignContents = function ()
	{
		nexacro._CompositeComponent.prototype.createCssDesignContents.call(this);
		this.set_fromValue('20190505');
		this.set_toValue('20190510');
	};
}


